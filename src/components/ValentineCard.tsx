import React, { useState } from "react";
import styled from "styled-components";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const CardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  transform-style: preserve-3d;
  transform: perspective(2500px);
  transition: 0.3s;
  font-family: 'Mochiy Pop P One', sans-serif;
`;

const CardFront = styled.div<{ isOpen: boolean }>`
  position: relative;
  background-color: #fff0f3;
  width: 400px;
  height: 300px;
  transform-origin: left;
  box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.15),
    30px 0 50px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  transform: ${({ isOpen }) => (isOpen ? "rotateY(-155deg)" : "none")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #d04e4e;
  text-align: center;
`;

const CardInside = styled.div`
  position: absolute;
  background-color: #fff0f3;
  width: 400px;
  height: 300px;
  z-index: -1;
  left: 0;
  top: 0;
  box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.22),
    100px 20px 100px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.5s;
`;

const MessagePage = styled.div`
  font-size: 20px;
  font-family: 'Pacifico', cursive;
  color: #d04e4e;
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #d04e4e;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  margin: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-family: 'Mochiy Pop P One', sans-serif;

  &:hover {
    background-color: #a03232;
  }
`;

const ValentineCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <CardContainer>
        <CardFront isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          💌 Click para Abrir 💌
        </CardFront>

        <CardInside>
          {showMessage ? (
            <MessagePage>
              💖 ¡Gracias por aceptar! 💖  
              <p>Nunca tuve la dicha de pasar mi 14 de Febrero con alguien, así que tengo un mensaje especial para ti...</p>
              <Button onClick={() => navigate("/message")}>💌 Click Aquí</Button>
            </MessagePage>
          ) : (
            <>
              <h2>¿Quieres ser mi San Valentín?</h2>
              <Button onClick={() => setShowMessage(true)}>💖 Sí</Button>
              <Button onClick={() => alert("💔 Oh no! 😢")}>💔 No</Button>
            </>
          )}
        </CardInside>
      </CardContainer>

      {isOpen && <Confetti />}
    </div>
  );
};

export default ValentineCard;
