import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Contenedor principal (sin overflow para mantener el fondo fijo)
const MessageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  font-family: 'Pacifico', cursive;
  color: white;
  position: relative;
  overflow: hidden;
`;

// Contenedor del contenido con SCROLL
const ScrollableContent = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 50px;
  text-align: left;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
  }
`;

// Fondo animado de estrellas
const StarsBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  &::before, &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(2px 2px at 10% 30%, #fff, transparent),
                radial-gradient(2px 2px at 40% 70%, #fff, transparent),
                radial-gradient(2px 2px at 60% 90%, #fff, transparent),
                radial-gradient(2px 2px at 20% 50%, #fff, transparent),
                radial-gradient(2px 2px at 90% 20%, #fff, transparent),
                radial-gradient(2px 2px at 5% 80%, #fff, transparent),
                radial-gradient(2px 2px at 75% 10%, #fff, transparent),
                radial-gradient(2px 2px at 95% 90%, #fff, transparent);
    animation: starsMove 10s linear infinite;
  }

  &::after {
    animation: starsMove 15s linear infinite reverse;
    opacity: 0.7;
  }

  @keyframes starsMove {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }
`;

// Título con efecto de brillo
const GlowingText = styled.h1`
  font-size: 36px;
  color: white;
  text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.8), 
               0px 0px 20px rgba(255, 255, 255, 0.6),
               0px 0px 30px rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
`;

// Texto del mensaje
const MessageText = styled.p`
  font-size: 22px;
  color: white;
  text-shadow: 0px 0px 8px rgba(255, 255, 255, 0.7);
  max-width: 100%;
  line-height: 1.6;
`;

// Botón elegante
const BackButton = styled.button`
  background-color: #d04e4e;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin: 20px 0;
  cursor: pointer;
  transition: 0.3s;
  font-family: 'Mochiy Pop P One', sans-serif;
  box-shadow: 0px 0px 10px rgba(208, 78, 78, 0.7);
  z-index: 3;

  &:hover {
    background-color: #a03232;
    box-shadow: 0px 0px 15px rgba(208, 78, 78, 0.9);
  }
`;

// 🎵 Contenedor de música
const MusicContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.3);
  z-index: 3;
`;

const MessagePage: React.FC = () => {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs = ["/song1.mp3", "/song2.mp3"]; // Asegúrate que los nombres coincidan con los archivos en public

  // Cambia la canción cuando termina
  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex];
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  return (
    <MessageContainer>
      <StarsBackground /> {/* Fondo de estrellas animadas */}
      <ScrollableContent>
      <BackButton onClick={() => navigate("/")}>⬅️ Volver</BackButton>
        <GlowingText>💖 ¡Mi amada Raquelita! 💖</GlowingText>   
        <MessageText>
    Es increible que el tiempo pasó tan rápido y de noviembre ya estamos casi mitad de febrero y llegando a marzo, a veces me pregunto porque cuando uno es feliz el tiempo vuela y cuando uno sufre el tiempo pasa tan lento? se que algún dia sabré la respuesta de eso, en fin amor cada día de mi vida es diferente desde que estoy contigo. Siempre siento alegria al despetarme y paz antes de dormir, son tantas sensaciones nuevas que no sentía antes, soy tan feliz contigo que no tengo dudas que dentro de poco ya estaremos casados y viviendo juntos como tanto deseamos.
        <br /><br />

          Son muchas cosas que quisiera decirte que incluso podría decir que son infinitas y bueno vamos juntos casi 3 meses y para la mayoría puede ser muy poco pero no me caben dudas que nosotros estamos destinados a pasar el resto de nuestras vidas juntos porque lo mucho que avanzamos y crecimos como relación en tan poco tiempo es digno de admirar y es por eso que quiero que sepas tantas cosas que deseo hacer contigo, son muchísimas así que solo te mencionaré unas cuantas...
          <br /><br />
          Quiero que al despertar estés tú a mi lado para sentir paz y tranquilidad así las cosas no estén bien, quiero seguir sintiendo por el resto de mi vida que no estoy solo y que tú estás ahí conmigo en todo momento, quiero que tengamos una familia muy linda y unida envidiada por todos, con unos lindos hijos que sean criados con mucho amor, quiero viajar contigo y recorrer el mundo ya que vivir aventuras con la persona que tanto amas es algo de otro planeta y no sabes la emoción que siento cada que me imagino a nosotros en alguna parte del mundo viajando y disfrutando, quiero acampar contigo y que miremos las constelaciones para decirte que mi amor por ti es mas grande que las estrellas...
          <br /><br />
          Quiero ser tu amigo, confidente, mejor amigo, quiero ser tu enamorado, tu novio, tu prometido, quiero ser tu hombre, tu esposo, tu marido, quiero que estés ahí conmigo cuando me gradúe de la universidad y consiga lo que tanto anhelé, quiero que estés en mis fracasos y en mis victorias, quiero que me acompañes hasta el día que me toque partir de esta tierra y que una parte de ti se vaya conmigo y una parte mía viva en ti, quiero...quiero...quiero millones de cosas más contigo.
          <br /><br />
          Este testamento se me queda corto así que de una vez pasemos a la parte de agradecimiento jajas.
          <br /><br />
          Quiero agradecerte por estar conmigo, por abrazar mis problemas y mi vulnerabilidad, por no minimizar mi sentir, por seguirme enamorando mas aunque ya me tienes, por preocuparte por mí, por desear lo mejor para mi vida y mi futuro, por llenarme de paz cuando siento angustia, por elegirme a mí, por ser la mujer que le pedí a Dios en mis oraciones, por ser tan dulce y tan virtuosa, por ser una persona única y especial conmigo, por confiar en mí y no dejarme a pesar de los problemas, por enseñarme a amar realmente y principalmente gracias por cruzarte en mi camino.
          <br /><br />
          Y ya para terminar... nunca dudes de la gran mujer que eres y nunca me dejes ni me abandones mi amor.
        
          <br /><br />

          TE AMO RAQUEL, ERES EL AMOR DE MI VIDA Y GRACIAS POR TODO ESTE TIEMPO A TU LADO 🌹✨
        </MessageText>
      </ScrollableContent>

      {/* 🎵 Controles de música 🎵 */}
      <MusicContainer>
        <audio ref={audioRef} controls autoPlay onEnded={handleSongEnd}>
          <source src={songs[currentSongIndex]} type="audio/mp3" />
          Tu navegador no soporta audio.
        </audio>
      </MusicContainer>
    </MessageContainer>
  );
};

export default MessagePage;
