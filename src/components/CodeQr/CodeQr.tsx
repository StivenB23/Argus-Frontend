import "./CodeQr.css"

const CodeQr = ({ onMouseDown }) => {
    return (
        <div
            className='codeQr'
            onMouseDown={onMouseDown}
            style={{ cursor: 'grab' }}
        >
            Código QR
        </div>
    );
};

export default CodeQr;