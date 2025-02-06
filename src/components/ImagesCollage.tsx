import React, { useEffect, useState } from "react";
import styled from "styled-components";

const IMAGE_SIZE = 120; // Tamaño de las imágenes en píxeles
const SAFE_MARGIN = 15; // Margen de seguridad en porcentaje

const StyledGalleryWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledImage = styled.img<{ $top: number; $left: number; $rotation: number }>`
  position: absolute;
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  opacity: 0;
  animation: fadeIn 1s forwards;

  &:hover {
    transform: scale(1.1) rotate(${({ $rotation }) => $rotation + 5}deg);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const photos = [
  { src: "/assets/a1.jpeg" },
  { src: "/assets/a2.jpeg" },
  { src: "/assets/a3.jpeg" },
  { src: "/assets/a4.jpeg" },
  { src: "/assets/a5.jpeg" },
  { src: "/assets/a6.jpeg" },
  { src: "/assets/a7.jpeg" },
  { src: "/assets/a8.jpeg" },
  { src: "/assets/a9.jpeg" },
  { src: "/assets/a11.jpeg" },
  { src: "/assets/a12.jpeg" },
  { src: "/assets/a13.jpeg" },
  { src: "/assets/a14.jpeg" },
  { src: "/assets/a15.jpeg" },
  { src: "/assets/a16.jpeg" },
  { src: "/assets/a17.jpeg" },
  { src: "/assets/a18.jpeg" },
];

// Función para generar posiciones SIN superposiciones y SIN imágenes cortadas
const generateRandomPositions = (count: number) => {
  const positions: { top: number; left: number; rotation: number }[] = [];
  const usedPositions = new Set<string>();

  while (positions.length < count) {
    let top = Math.random() * (100 - SAFE_MARGIN * 2) + SAFE_MARGIN;
    let left = Math.random() * (100 - SAFE_MARGIN * 2) + SAFE_MARGIN;

    // Evitar que las imágenes se posicionen sobre la tarjeta
    if (top > 30 && top < 70 && left > 30 && left < 70) {
      continue; // Se descarta y se genera una nueva posición
    }

    const key = `${Math.round(top)}-${Math.round(left)}`;

    if (!usedPositions.has(key)) {
      positions.push({
        top,
        left,
        rotation: Math.random() * 20 - 10, // Pequeña rotación aleatoria
      });
      usedPositions.add(key);
    }
  }

  return positions;
};

const ImagesCollage: React.FC = () => {
  const [positions, setPositions] = useState<{ top: number; left: number; rotation: number }[]>([]);

  useEffect(() => {
    setPositions(generateRandomPositions(photos.length));
  }, []);

  return (
    <StyledGalleryWrapper>
      {photos.map((photo, index) => {
        const { top, left, rotation } = positions[index] || { top: 0, left: 0, rotation: 0 };
        return <StyledImage key={index} src={photo.src} $top={top} $left={left} $rotation={rotation} />;
      })}
    </StyledGalleryWrapper>
  );
};

export default ImagesCollage;
