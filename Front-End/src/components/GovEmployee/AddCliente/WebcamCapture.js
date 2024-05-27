import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
function WebcamCapture({ onSnapshot, onClose }) {
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null); // Alterado para useRef
  const canvasRef = useRef(null); // Alterado para useRef


  useEffect(() => {
    const startWebcamCapture = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erro ao acessar a webcam:", error);
      }
    };

    startWebcamCapture();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
  
      // Enviar a foto para o backend
      axios.post("/api/salvarFoto", { foto: imageData })
        .then(response => {
          console.log("Foto enviada com sucesso!");
        })
        .catch(error => {
          console.error("Erro ao enviar a foto:", error);
        });
    }
  };
  const stopWebcamCapture = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      onClose();
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: "100%" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={takeSnapshot}>Capturar Foto</button>
      <button onClick={stopWebcamCapture}>Encerrar Captura</button>
    </div>
  );
}

export default WebcamCapture;
