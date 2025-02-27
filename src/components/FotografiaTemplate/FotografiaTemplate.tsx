import React from 'react';

const FotografiaTemplate = ({ dimensions = {}, onMouseDown }) => {
    return (
        <div
            className="foto"
            onMouseDown={onMouseDown}
            style={{ cursor: 'grab', width: `${dimensions.width}cm`, height: `${dimensions.height}cm` }}
            draggable="false"
        >
            Fotografía
        </div>
    );
};

export default FotografiaTemplate;
