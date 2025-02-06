import React, { useEffect, useRef } from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import ValentineCard from "../components/ValentineCard";
import ImagesCollage from "../components/ImagesCollage"; // Importa el collage

const HomePage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5; // Opcional: Ajusta el volumen
        audioRef.current
          .play()
          .catch((error) => console.error("Error al reproducir:", error));
      }
    };

    // Intentar reproducir cuando el usuario interactúe
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-screen h-screen">
      {/* Reproductor de audio (Oculto) */}
      <audio ref={audioRef} src="/song3.mp3" loop />

      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Collage de imágenes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <ImagesCollage />
      </div>

      {/* Contenido principal */}
      <div className="relative flex flex-col items-center justify-center h-screen z-10">
        <ValentineCard />
      </div>
    </div>
  );
};

export default HomePage;
