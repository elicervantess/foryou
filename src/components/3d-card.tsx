import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Confetti from "react-confetti";

const beat = keyframes`
  0%, 40%, 100% {
    transform: scale(1) rotate(-45deg);
  }
  25%, 60% {
    transform: scale(1.1) rotate(-45deg);
  }
`;

const close = keyframes`
  0%, 100% {
    transform: scale(1, .05);
  }
  5%, 95% {
    transform: scale(1, 1);
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  transform-style: preserve-3d;
  transform: perspective(2500px);
  transition: 0.3s;
`;

const CardFront = styled.div<{ isOpen: boolean }>`
  position: relative;
  background-color: #fff0f3;
  width: 300px;
  height: 300px;
  transform-origin: left;
  box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.15),
    30px 0 50px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  transform: ${({ isOpen }) => (isOpen ? "rotateY(-155deg)" : "none")};
`;

const CardInside = styled.div`
  position: absolute;
  background-color: #fff0f3;
  width: 300px;
  height: 300px;
  z-index: -1;
  left: 0;
  top: 0;
  box-shadow: inset 100px 20px 100px rgba(0, 0, 0, 0.22),
    100px 20px 100px rgba(0, 0, 0, 0.1);
`;

const Note = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  background-color: #fff0f3;
  top: 75px;
  left: 50px;
  color: #333;
  font-size: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
  &:before,
  &:after {
    position: absolute;
    content: "";
    background-color: #ba1c1c;
    width: 40px;
    height: 40px;
  }
  &:before {
    transform: rotate(-45deg);
    top: -20px;
    left: 80px;
  }
  &:after {
    border-radius: 50%;
    top: -35px;
    left: 65px;
    box-shadow: 30px 0 #ba1c1c;
  }
`;

const Heart = styled.div`
  position: relative;
  background-color: #d04e4e;
  height: 60px;
  width: 60px;
  top: 180px;
  left: 120px;
  transform: rotate(-45deg);
  animation: ${beat} 0.8s infinite;
  &:before,
  &:after {
    content: "";
    background-color: #d04e4e;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    position: absolute;
  }
  &:before {
    top: -30px;
    left: 0;
  }
  &:after {
    left: 30px;
    top: 0;
  }
`;

const Smile = styled.div`
  position: absolute;
  width: 30px;
  height: 15px;
  background-color: #333;
  z-index: 1;
  border-radius: 0 0 100px 100px;
  top: 200px;
  left: 135px;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #030202;
    top: 5px;
    left: 5px;
  }
`;

const Eyes = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: #333;
  width: 10px;
  height: 10px;
  z-index: 1;
  top: 190px;
  left: 165px;
  box-shadow: -40px 0 #333;
  transform-origin: 50%;
  animation: ${close} 2s infinite;
`;

const ValentineCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <CardContainer>
        <CardFront isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <Note>Click para Abrir</Note>
        </CardFront>
        <CardInside>
          <div className="text-one">
            <span>Feliz</span>
            <span>San Valentin!!!</span>
          </div>
          <Heart>
            <Smile />
            <Eyes />
          </Heart>
        </CardInside>
      </CardContainer>
      {isOpen && <Confetti />}
    </div>
  );
};

export default ValentineCard;