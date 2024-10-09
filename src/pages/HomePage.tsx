import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bienvenido a ExploreConnect
        </h1>
        <p className="text-lg text-gray-400">
          Fomenta el turismo con nuestras reservas
        </p>
      </div>
    </div>
  );
};

export default HomePage;
