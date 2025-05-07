import React from "react";
import "./Modal.css";


const Modal: React.FC = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // evita que se cierre al hacer click dentro del contenido
      >
        <button className="modal-close" onClick={onClose}>
         x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
