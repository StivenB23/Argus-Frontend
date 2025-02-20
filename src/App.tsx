import "./App.css";
import { useState, useRef } from "react";
import { registerUser, verifyFace } from "./services/AuthService";

const App = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null); // La imagen capturada en base64
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const startCamera = () => {
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          setMessage("Error al acceder a la cámara");
        });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setImage(imageData); // Guardamos la imagen en base64
      }
    }
  };

  const handleRegister = async () => {
    if (!name || !image) {
      setMessage("Por favor, introduce un nombre y toma una foto.");
      return;
    }

    // Convertir la imagen en base64 a un archivo
    const blob = await fetch(image!).then((res) => res.blob());
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    const response = await registerUser(name, file);
    setMessage(response.message);
  };

  const handleVerify = async () => {
    if (!image) {
      setMessage("Por favor, toma una foto.");
      return;
    }

    // Convertir la imagen en base64 a un archivo
    const blob = await fetch(image!).then((res) => res.blob());
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    const response = await verifyFace(file);
    setMessage(response.message);
  };

  return (
    <div>
      <h2>Autenticación Facial</h2>
      <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={startCamera}>Iniciar Cámara</button>
      <div>
        <video ref={videoRef} autoPlay width="300" height="200" />
        <canvas ref={canvasRef} width="300" height="200" style={{ display: "none" }} />
      </div>
      <button onClick={captureImage}>Capturar Foto</button>
      {image && <img src={image} alt="Captura" width="100" />}
      <button onClick={handleRegister}>Registrar</button>
      <button onClick={handleVerify}>Verificar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
