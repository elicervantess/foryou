import React, { useEffect, useRef } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import ValentineCard from "../components/ValentineCard";
import ImagesCollage from "../components/ImagesCollage"; // Importa el collage

const HomePage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Opcional: Ajusta el volumen (0.0 - 1.0)
      audioRef.current.play().catch(error => console.error("Error al reproducir:", error));
    }
  }, []);

  return (
    <div className="relative overflow-hidden w-screen h-screen">
      {/* Reproductor de audio (Oculto) */}
      <audio ref={audioRef} src="/song3.mp3" loop autoPlay />

      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Collage de imágenes - Ocupará toda la pantalla SIN superponer la tarjeta */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <ImagesCollage />
      </div>

      {/* Contenido principal con ValentineCard */}
      <div className="relative flex flex-col items-center justify-center h-screen z-10">
        <ValentineCard />
      </div>
    </div>
  );
};

export default HomePage;
