import { useState } from "react";
import "./FormTemplateInformation.css";

const FormTemplateInformation = ({
  tipoSectorPlantilla,
  informationTemplate,
  setinformationTemplate,
}) => {
  const [dataSelected, setDataSelected] = useState(null);
  const DATAACADEMIC = [
    { nombre: "Nombre", label: "nombres" },
    { nombre: "Apellidos", label: "apellidos" },
    { nombre: "Tipo de Documento", label: "tipoDocumento" },
    { nombre: "N° Documento", label: "documento" },
    { nombre: "Cargo", label: "cargo" },
    { nombre: "Grado", label: "grado" },
    { nombre: "Jornada", label: "jornada" },
    { nombre: "Rh", label: "rh" },
  ];

  const addInformationTemplate = (data) => {
    if (
      !informationTemplate.some((information) => information?.nombre === data)
    ) {
      // Si el elemento no está en el estado, agrégalo
      setinformationTemplate((prevState) => [...prevState, { nombre: data }]);
      console.log(`Incluir ${data}`);
      console.log(informationTemplate);
    } else {
      // Si el elemento está en el estado, quítalo
      setinformationTemplate((prevState) =>
        prevState.filter((info) => info.nombre !== data)
      );
      console.log(`Quitar ${data}`);
    }
  };

  const addStyleBoldFont = (e, label) => {
    let styleData = e.target.value;
    let dataIndex = informationTemplate.findIndex(
      (information) => information.nombre === label
    );

    // Actualiza el estilo de la información en el estado
    const updatedInformationTemplate = [...informationTemplate];
    updatedInformationTemplate[dataIndex][styleData] = e.target.checked;

    // Establece el nuevo estado
    setinformationTemplate(updatedInformationTemplate);
    console.log(updatedInformationTemplate);
  };
  const addStyleItalicFont = (e, label) => {
    let styleData = e.target.value;
    let dataIndex = informationTemplate.findIndex(
      (information) => information.nombre === label
    );
    // Actualiza el estilo de la información en el estado
    const updatedInformationTemplate = [...informationTemplate];
    updatedInformationTemplate[dataIndex][styleData] = e.target.checked;

    // Establece el nuevo estado
    setinformationTemplate(updatedInformationTemplate);
    console.log(informationTemplate);
  };
  const addStyleSizeFont = (e, label) => {
    let styleData = e.target.value;
    let dataIndex = informationTemplate.findIndex(
      (information) => information.nombre === label
    );
    if (!(styleData in informationTemplate[dataIndex])) {
      informationTemplate[dataIndex][styleData] = true;
    } else {
      informationTemplate[dataIndex][styleData] = false;
    }
    console.log(informationTemplate);
  };
  const changeStyleColorFont = (e, label) => {
    let styleDataColor = e.target.value;
    let dataIndex = informationTemplate.findIndex(
      (information) => information.nombre === label
    );
    // Actualiza el estilo de la información en el estado
    const updatedInformationTemplate = [...informationTemplate];
    updatedInformationTemplate[dataIndex]["color"] = styleDataColor;

    // Establece el nuevo estado
    setinformationTemplate(updatedInformationTemplate);
    console.log(informationTemplate);
  };

  const chekedValue = (array, label, input) => {
    let data = array.some((data) => data.nombre == label);
  };
  return (
    <div className="formtemplateinformation">
      {tipoSectorPlantilla == "academico" && (
        <>
          {DATAACADEMIC.map((academic) => (
            <>
              <input
                type="checkbox"
                name="Nombres"
                checked={informationTemplate.some(
                  (information) => information?.nombre === academic.label
                )}
                id="Nombres"
                value={academic.label}
                onChange={(e) => addInformationTemplate(e.target.value)}
              />
              {academic.nombre}
              {dataSelected == academic.label ? (
                <span onClick={() => setDataSelected(null)}>X</span>
              ) : (
                <span onClick={() => setDataSelected(academic.label)}>V</span>
              )}
              {informationTemplate.some(
                (information) => information?.nombre === dataSelected
              ) && dataSelected == academic.label ? (
                <>
                  <b>Negrilla</b>{" "}
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={informationTemplate.some(
                      (information) =>
                        information?.nombre === academic.label &&
                        information.bold == true
                    )}
                    value="bold"
                    onChange={(e) => addStyleBoldFont(e, academic.label)}
                  />
                  <i>Italica</i>{" "}
                  <input
                    type="checkbox"
                    checked={informationTemplate.some(
                      (information) =>
                        information?.nombre === dataSelected &&
                        information.italic == true
                    )}
                    name=""
                    id=""
                    value="italic"
                    onChange={(e) => addStyleItalicFont(e, academic.label)}
                  />
                  <span>
                    Color:{" "}
                    <input
                      type="color"
                      name=""
                      id=""
                      onChange={(e) => changeStyleColorFont(e, academic.label)}
                    />
                  </span>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

FormTemplateInformation.propTypes = {};

export default FormTemplateInformation;
