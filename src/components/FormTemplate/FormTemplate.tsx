// components/FormTemplate.tsx
import { useCallback, useState } from "react";
import "./FormTemplate.css";
import { useForm } from "react-hook-form";
import { PreviewTemplate } from "../PreviewTemplate";
import { FormTemplateInformation } from "../FormTemplateInformation";
import jsPDF from "jspdf";
import { Template } from "@services/models/template.model";
import { createTemplateService } from "../../services/template.service";
import ColorPickerCard from "@components/ui/ColorPicker/ColorPicker";

const FormTemplate = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [dataElementsPositions, setDataElementsPositions] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [seguridad, setSeguridad] = useState({
    type: "",
    ancho: 0,
    alto: 0,
    position_x: 0,
    position_y: 0,
  });
  const [background, setBackground] = useState<File | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [orientation, setOrientation] = useState("vertical");
  const [informationTemplate, setInformationTemplate] = useState<any[]>([]);
  const [photoDimension, setPhotoDimension] = useState({
    width: 2.8,
    height: 3,
    position_x: 1,
    position_y: 1,
  });
  const [templateDimension, setTemplateDimension] = useState({
    width: 5.5,
    height: 8.5,
    unit: "",
  });

  const handleToggle = useCallback((option: string) => {
    setSelectedOption((prev) => (prev === option ? null : option));
  }, []);

  const updateDimension = (
    type: "photo" | "template",
    key: "width" | "height",
    value: string
  ) => {
    const parsed = parseFloat(value);
    const num = isNaN(parsed) ? 0 : parsed;
    type === "photo"
      ? setPhotoDimension((prev) => ({ ...prev, [key]: num }))
      : setTemplateDimension((prev) => ({ ...prev, [key]: num }));
  };

  const changeUnit = (unit: string) => {
    setTemplateDimension((prev) => ({ ...prev, unit }));
  };

  const changeOrientation = (dir: "vertical" | "horizontal") => {
    setOrientation(dir);
    setTemplateDimension((prev) => ({
      ...prev,
      width: prev.height,
      height: prev.width,
    }));
  };

  const uploadBackgroundTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackground(file);
      setBackgroundUrl(URL.createObjectURL(file));
    }
  };

  const removeBackground = () => setBackgroundUrl("");

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: templateDimension.unit || "cm",
      format: [templateDimension.width, templateDimension.height],
    });
    console.log("Unidad de medida:", templateDimension.unit || "cm");

    if (backgroundUrl) {
      const img = new Image();
      img.src = backgroundUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(
          imgData,
          "PNG",
          0,
          0,
          templateDimension.width,
          templateDimension.height
        );

        finalizePDF(doc);
      };
    } else {
      finalizePDF(doc);
    }
  };

  const finalizePDF = (doc: jsPDF) => {
    doc.setFontSize(12);
    doc.text("Plantilla Generada", 0.5, 0.5); // para que no se salga

    doc.setDrawColor(0);
    doc.setFillColor(0, 0, 0);
    doc.rect(0.6, 6.5, 4, 0.7, "F"); // x, y, width, height en centímetros si unit = "cm"

    doc.addImage(
      "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/bell-cranel-crying.jpg",
      "JPG",
      1.08,
      0.23,
      2.8,
      3
    );

    doc.save("template.pdf");
  };

  // 👇 Simulamos función externa
  const crearUsuario = (data: any) => {
    console.log("Creando usuario con:", data);
    alert("Usuario creado correctamente.");
  };

  const createTemplate = async (data: any) => {
    const templateData: Template = {
      template_name: data.nameTemplate,
      unit: templateDimension.unit,
      width: templateDimension.width,
      height: templateDimension.height,
      background: backgroundUrl,
      photo_height: photoDimension.height,
      photo_width: photoDimension.width,
      photo_x: photoDimension.position_x,
      photo_y: photoDimension.position_y,
      code_type: seguridad.type,
      code_type_y: seguridad.position_y,
      code_type_x: seguridad.position_x,
    };
    console.log(templateData);
    await createTemplateService(templateData, background);
  };

  const consultarInformacion = () => {
    console.log(informationTemplate);
    console.log(JSON.stringify(informationTemplate));
  };

  return (
    <section className="template">
      <form onSubmit={handleSubmit(createTemplate)}>
        <article>
          <h1>Crear Plantilla</h1>
          <h4>Configuración General</h4>

          <label htmlFor="nameTemplate">Nombre Plantilla</label>
          <input
            type="text"
            id="nameTemplate"
            {...register("nameTemplate", { required: true })}
          />

          <label>Unidad de medida</label>
          <span onClick={() => changeUnit("cm")}>cm</span>
          <span onClick={() => changeUnit("px")}>px</span>

          <label>Ancho</label>
          <input
            type="number"
            min={0}
            disabled={!templateDimension.unit}
            value={templateDimension.width}
            onChange={(e) =>
              updateDimension("template", "width", e.target.value)
            }
          />

          <label>Alto</label>
          <input
            type="number"
            min={0}
            disabled={!templateDimension.unit}
            value={templateDimension.height}
            onChange={(e) =>
              updateDimension("template", "height", e.target.value)
            }
          />

          <label>Identificador de seguridad</label>
          {["CodBarra", "CodQR", "Ninguno"].map((opt) => (
            <label key={opt}>
              <input
                type="radio"
                value={opt}
                checked={seguridad["type"] === opt}
                onChange={() =>
                  setSeguridad((prev) => ({ ...prev, type: opt }))
                }
              />
              {opt}
            </label>
          ))}

          <label>Cargar Fondo</label>
          <small>Si no carga fondo, se usará blanco</small>
          <input type="file" onChange={uploadBackgroundTemplate} />
          <button type="button" onClick={removeBackground}>
            Remover fondo
          </button>

          <h3 onClick={() => handleToggle("fotografia")}>Fotografía</h3>
          {selectedOption === "fotografia" && (
            <div className="dropdown-menu">
              <label>Ancho</label>
              <input
                type="number"
                value={photoDimension.width}
                onChange={(e) =>
                  updateDimension("photo", "width", e.target.value)
                }
              />
              <label>Alto</label>
              <input
                type="number"
                value={photoDimension.height}
                onChange={(e) =>
                  updateDimension("photo", "height", e.target.value)
                }
              />
            </div>
          )}

          <h3 onClick={() => handleToggle("informacion")}>Información:</h3>
          {selectedOption === "informacion" && (
            <div className="dropdown-menu">
              <FormTemplateInformation
                tipoSectorPlantilla={"academico"}
                informationTemplate={informationTemplate}
                setinformationTemplate={setInformationTemplate}
              />
            </div>
          )}

          <h3 onClick={() => handleToggle("detalles")}>Detalles:</h3>
          {selectedOption === "detalles" && (
            <div className="dropdown-menu">
              <div className="">
                <label htmlFor="">Tamaño del texto</label>
                <input type="number" />
              </div>
              <div className="">
                <label htmlFor="">Color del texto</label>
                <ColorPickerCard />
              </div>
            </div>
          )}

          <button type="button" onClick={generatePDF}>
            Generar PDF
          </button>
          <button type="submit">Crear Plantilla</button>
          <button type="button" onClick={consultarInformacion}>
            Show data
          </button>
        </article>
      </form>

      <article>
        <h2>Vista Previa</h2>
        <PreviewTemplate
          templateDimension={templateDimension}
          informationData={informationTemplate}
          setInformationData={setInformationTemplate}
          background={backgroundUrl}
          photoDimension={photoDimension}
          seguridad={seguridad}
          setPhotoDimension={setPhotoDimension}
          setSeguridad={setSeguridad}
        />
      </article>
    </section>
  );
};

export default FormTemplate;
