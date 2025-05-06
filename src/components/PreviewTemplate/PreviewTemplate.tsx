import React, { useState } from "react";
import "./PreviewTemplate.css";

import { combinatdArrays } from "../../utils/arrayUtils";
import { CodeBar } from "../CodeBar";
import { CodeQr } from "../CodeQr";
import { FotografiaTemplate } from "../FotografiaTemplate";

const PreviewTemplate = ({
  background,
  orientation,
  informationData = [],
  setInformationData,
  templateDimension,
  photoDimension,
  seguridad,
  setPhotoDimension,
  setSeguridad,
}) => {
  const [dragging, setDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fotoPosition, setFotoPosition] = useState({ x: 0, y: 0 });
  const [codeBarPosition, setCodeBarPosition] = useState({ x: 0, y: 0 });
  const [codeQrPosition, setCodeQrPosition] = useState({ x: 0, y: 0 });
  const [dataElementsPositions, setDataElementsPositions] = useState([]);

  let estiloFondo = background
    ? {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        width: `${templateDimension.width}cm`,
        height: `${templateDimension.height}cm`,
      }
    : {
        backgroundColor: "#fff",
        width: `${templateDimension.width}${templateDimension.unitMeasurement}`,
        height: `${templateDimension.height}${templateDimension.unitMeasurement}`,
      };

  const handleMouseDown = (e, element, setPosition) => {
    const containerRect = element.parentElement.getBoundingClientRect();
    setDragging(true);
    setDraggedElement(element);
    const rect = element.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging && draggedElement) {
      const containerRect =
        draggedElement.parentElement.getBoundingClientRect();
      const maxX = containerRect.width - draggedElement.offsetWidth;
      const maxY = containerRect.height - draggedElement.offsetHeight;

      let newX = e.clientX - containerRect.left - offset.x;
      let newY = e.clientY - containerRect.top - offset.y;

      newX = Math.min(Math.max(newX, 0), maxX);
      newY = Math.min(Math.max(newY, 0), maxY);

      draggedElement.style.left = newX + "px";
      draggedElement.style.top = newY + "px";

      // Actualizar las posiciones X e Y del elemento arrastrado
      if (draggedElement.classList.contains("foto")) {
        setFotoPosition({
          x: newX,
          y: newY,
        });
        setPhotoDimension((prev) => ({
          ...prev,
          ["position_x"]: newX,
          ["position_y"]: newY,
        }));
      } else if (draggedElement.classList.contains("codeBar")) {
        setCodeBarPosition({
          x: newX,
          y: newY,
        });
        setSeguridad((prev) => ({
          ...prev,
          ["position_x"]: newX,
          ["position_y"]: newY,
        }));
      } else if (draggedElement.classList.contains("codeQr")) {
        setCodeQrPosition({
          x: newX,
          y: newY,
        });
        setSeguridad((prev) => ({
          ...prev,
          ["position_x"]: newX,
          ["position_y"]: newY,
        }));
      } else if (draggedElement.classList.contains("dataElement")) {
        // Guardar la última posición del elemento con la clase 'dataElement'
        const elementRect = draggedElement.getBoundingClientRect();
        setDataElementsPositions((prevPositions) => {
          const updatedPositions = prevPositions.filter(
            (item) => item.nombre !== draggedElement.textContent
          );
          let dataUpdatedXY = [
            ...updatedPositions,
            {
              x: newX,
              y: newY,
              nombre: draggedElement.textContent,
            },
          ];
          console.log(dataUpdatedXY);

          let informatiodCombinated = combinatdArrays(
            dataUpdatedXY,
            informationData
          );
          console.log(informatiodCombinated);
          
          setInformationData(dataUpdatedXY);
          return dataUpdatedXY;
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setDraggedElement(null);
  };

  return (
    <div className="preview">
      <div
        className="preview-carnet"
        style={estiloFondo}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <FotografiaTemplate
          dimensions={photoDimension}
          onMouseDown={(e) =>
            handleMouseDown(e, e.currentTarget, setFotoPosition)
          }
          position={fotoPosition}
        />
        {informationData.length > 0 &&
          informationData.map((data, index) => (
            <span
              className="dataElement"
              key={index}
              style={{
                fontWeight: data.bold ? 700 : "normal",
                fontStyle: data.italic ? "italic" : "normal",
                color: data?.color || "#000000",
              }}
              onMouseDown={(e) =>
                handleMouseDown(e, e.currentTarget, setDraggedElement)
              }
            >
              {data.nombre}
            </span>
          ))}
        {seguridad["type"] == "CodBarra" && (
          <CodeBar
            onMouseDown={(e) =>
              handleMouseDown(e, e.currentTarget, setCodeBarPosition)
            }
            position={codeBarPosition}
          />
        )}
        {seguridad["type"] == "CodQR" && (
          <CodeQr
            onMouseDown={(e) =>
              handleMouseDown(e, e.currentTarget, setCodeQrPosition)
            }
            position={codeQrPosition}
          />
        )}
      </div>
      <div className="posiciones-container">
        <h3>📷 Fotografía:</h3>
        <div className="posiciones-grid">
          <div className="posicion-item">
            <label>Posición X:</label>
            <input type="text" value={fotoPosition.x} />
          </div>
          <div className="posicion-item">
            <label>Posición Y:</label>
            <input type="text" value={fotoPosition.y} />
          </div>
        </div>

        {seguridad["type"] === "CodBarra" && (
          <>
            <h3>📦 Código de barras:</h3>
            <div className="posiciones-grid">
              <div className="posicion-item">
                <label>Posición X:</label>
                <input type="text" value={codeBarPosition.x} />
              </div>
              <div className="posicion-item">
                <label>Posición Y:</label>
                <input type="text" value={codeBarPosition.y} />
              </div>
            </div>
          </>
        )}

        {seguridad["type"] === "CodQR" && (
          <>
            <h3>🔲 Código QR:</h3>
            <div className="posiciones-grid">
              <div className="posicion-item">
                <label>Posición X:</label>
                <input type="text" value={codeQrPosition.x} />
              </div>
              <div className="posicion-item">
                <label>Posición Y:</label>
                <input type="text" value={codeQrPosition.y} />
              </div>
            </div>
          </>
        )}

        <h3>📑 Datos:</h3>
        <div className="data-elementos">
          {dataElementsPositions.map((position, index) => (
            <div className="data-elemento" key={index}>
              <p>Campo: <b>{position.nombre}</b></p>
              <span>Posición X: {position.x} </span>
              <span>Posición Y: {position.y}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewTemplate;
