import { useState } from "react";
import "./FormTemplate.css";
import PropTypes from "prop-types";
import { PreviewTemplate } from "../PreviewTemplate";
import { FormTemplateInformation } from "../FormTemplateInformation";
import jsPDF from 'jspdf';


const FormTemplate = ({}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [seguridad, setSeguridad] = useState("Ninguno");
  const [background, setBackground] = useState();
  const [orientation, setOrientation] = useState("vertical");
  const [informationTemplate, setinformationTemplate] = useState([]);
  const [backgroundUrL, setBackgroundUrl] = useState("");
  const [tipoSectorPlantilla, setTipoSectorPlantilla] = useState("");
  const [photoDimension, setPhotoDimension] = useState({
    width: 2.8,
    height: 3,
    unitMeasurement: "",
  });
  const [templateDimension, setTemplateDimension] = useState({
    width: 5.5,
    height: 8.5,
    unitMeasurement: "",
  });

  const handleToggle = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  const generatePDF = () => {
	const doc = new jsPDF({
	  orientation: orientation === "vertical" ? "portrait" : "landscape",
	  unit: templateDimension.unitMeasurement || "cm",
	  format: [templateDimension.width, templateDimension.height],
	});
  
	// Cargar imagen de fondo si está disponible
	if (backgroundUrL) {
	  const img = new Image();
	  img.src = backgroundUrL;
	  img.onload = () => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
  
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
  
		const imgData = canvas.toDataURL("image/png"); // Convertir imagen a Base64
		doc.addImage(imgData, "PNG", 0, 0, templateDimension.width, templateDimension.height);
		
		// Generar y guardar el PDF después de cargar la imagen
		finalizePDF(doc);
	  };
	} else {
	  finalizePDF(doc);
	}
  };
  
  // Función para agregar elementos y guardar el PDF
  const finalizePDF = (doc) => {
	// Agregar texto de ejemplo
	doc.setFontSize(12);
	doc.text("Plantilla Generada", 10, 10);
  
	// Dibujar el recuadro de la foto
	doc.setDrawColor(0);
	doc.setLineWidth(0.5);
	doc.rect(10, 20, photoDimension.width, photoDimension.height); // Coordenadas X, Y, Ancho, Alto
  
	// Guardar PDF
	doc.save("template.pdf");
  };
  

  const changePhotoDimensionHeight = (e) => {
    console.log(e.target.value);
    let photoHeight = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value, 10).toString() || 0;
    setPhotoDimension({ width: photoDimension.width, height: photoHeight });
    console.log(photoDimension);
  };

  const changePhotoDimensionWith = (e) => {
    let photoWidth = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value, 10).toString() || 0;
    setPhotoDimension({ width: photoWidth, height: photoDimension.height });
    console.log(photoDimension);
  };
  const changeTemplateDimensionHeight = (e) => {
    console.log(e.target.value);
    let templateHeight = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value, 10).toString() || 0;
    console.log(templateHeight);
    setTemplateDimension({
      width: templateDimension.width,
      height: templateHeight,
      unitMeasurement: templateDimension.unitMeasurement,
    });
    console.log(photoDimension);
  };

  const changeTemplateDimensionWith = (e) => {
    let templateWidth = isNaN(parseFloat(e.target.value))
      ? 0
      : parseFloat(e.target.value, 10).toString() || 0;
    setTemplateDimension({
      width: templateWidth,
      height: templateDimension.height,
      unitMeasurement: templateDimension.unitMeasurement,
    });
    console.log(photoDimension);
  };

  const changeTemplateunitMeasurement = (unit) => {
    console.log(unit);
    setTemplateDimension({
      width: templateDimension.width,
      height: templateDimension.height,
      unitMeasurement: unit,
    });
    console.log(templateDimension);
  };

  const uploadBackgroundTemplate = (e) => {
    console.log(e.target.files[0]);
    const urlImage = URL.createObjectURL(e.target.files[0]);
    setBackgroundUrl(urlImage);
  };

  const changeOrientation = (orientation) => {
    if (orientation === "vertical") {
      setOrientation("vertical");
      setTemplateDimension({
        width: templateDimension.height,
        height: templateDimension.width,
        unitMeasurement: templateDimension.unitMeasurement,
      });
    } else {
      setOrientation("horizontal");
      setTemplateDimension({
        width: templateDimension.height,
        height: templateDimension.width,
        unitMeasurement: templateDimension.unitMeasurement,
      });
    }
  };

//   const changeTypeTemplate = (e) => {
//     setTipoSectorPlantilla(e.target.value);
//     setinformationTemplate([]);
//   };

  const removeBackground = () => {
    setBackgroundUrl("");
  };

  return (
    <section className="template">
      <article>
        <h1>Crear Plantilla</h1>
        <h4>Configuración General</h4>
        <div>
          <label htmlFor="nameTemlate">Nombre Plantilla</label>
          <input type="text" id="nameTemlate" /> <br />
          <label htmlFor="">Unidad de medida a usar</label>
          <span onClick={() => changeTemplateunitMeasurement("cm")}>cm</span>
          <span onClick={() => changeTemplateunitMeasurement("px")}>px</span> <br /><br />
          <label htmlFor="withTemplate">Ancho </label>
          <input
            type="number"
            name=""
            min={0}
            disabled={templateDimension.unitMeasurement == "" ? true : false}
            value={templateDimension.width}
            id="withTemplate"
            onChange={changeTemplateDimensionWith}
          /> <br /><br />
          <label htmlFor="heightTemplate">Alto </label>
          <input
            type="number"
            name=""
            min={0}
            disabled={templateDimension.unitMeasurement == "" ? true : false}
            value={templateDimension.height}
            id="heightTemplate"
            onChange={changeTemplateDimensionHeight}
          />
          <label htmlFor="">Identificador de seguridad</label>
          <input
            type="radio"
            name="seguridad"
            value="CodBarra"
            onChange={() => setSeguridad("CodBarra")}
          /> 
          Código de Barra
          <input
            type="radio"
            name="seguridad"
            value="CodQR"
            onChange={() => setSeguridad("CodQR")}
          />
          Código QR
          <input
            type="radio"
            name="seguridad"
            value="Ninguno"
            onChange={() => setSeguridad("Ninguno")}
          />
          Ninguno <br /><br />
          <label htmlFor="">Cargar Fondo</label>
          <small>Si no carga fondo, se usara el color blanco por defecto</small>
          <input
            type="file"
            name=""
            onChange={uploadBackgroundTemplate}
            id=""
          /> 
          <button type="button" onClick={removeBackground}>
            Remover fondo
          </button>
        </div>
        <div>
          <h3 onClick={() => handleToggle("fotografia")}>Fotografía</h3>
          {selectedOption === "fotografia" && (
            <div className="dropdown-menu">
              <label htmlFor="">Ancho</label>
              <input
                type="number"
                value={photoDimension.width}
                onChange={changePhotoDimensionWith}
              />
              <label htmlFor="">Alto</label>
              <input
                type="number"
                value={photoDimension.height}
                onChange={changePhotoDimensionHeight}
              />
            </div>
          )}
        </div>

        <div>
          <h3 onClick={() => handleToggle("informacion")}>Información:</h3>
          {selectedOption === "informacion" && (
            <div className="dropdown-menu">
              <FormTemplateInformation
                tipoSectorPlantilla={"academico"}
                informationTemplate={informationTemplate}
                setinformationTemplate={setinformationTemplate}
              />
            </div>
          )}
        </div>

        <div>
          <h3 onClick={() => handleToggle("detalles")}>Detalles:</h3>
          {selectedOption === "detalles" && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Opción 1</div>
              <div className="dropdown-item">Opción 2</div>
              <div className="dropdown-item">Opción 3</div>
            </div>
          )}
        </div>
        <button onClick={generatePDF}>Generar PDF</button>
      </article>
      <article>
        <h2>Vista Previa</h2>
        <PreviewTemplate
          templateDimension={templateDimension}
          informationData={informationTemplate}
          setInformationData={setinformationTemplate}
          background={backgroundUrL}
          photoDimension={photoDimension}
          seguridad={seguridad}
        />
      </article>
    </section>
  );
};

FormTemplate.propTypes = {};

export default FormTemplate;
