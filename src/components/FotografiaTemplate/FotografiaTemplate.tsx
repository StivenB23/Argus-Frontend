import React from 'react';
import './FotografiaTemplate.css'

const FotografiaTemplate = ({ dimensions = {}, onMouseDown }) => {
    return (
        <div
            className="foto"
            onMouseDown={onMouseDown}
            style={{ cursor: 'grab', width: `${dimensions.width}cm`, height: `${dimensions.height}cm` }}
            draggable="false"
        >
           <p>Fotografía</p> 
        </div>
    );
};

export default FotografiaTemplate;
