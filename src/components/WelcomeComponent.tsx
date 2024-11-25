import React from "react";

interface WelcomeComponentProps {
  ownerName: string;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ ownerName }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        ¡Bienvenido, {ownerName}!
      </h1>
      <p className="text-gray-600 mt-2">
        Aquí puedes gestionar tus lugares y reservas.
      </p>
    </div>
  );
};
//cambio
export default WelcomeComponent;
