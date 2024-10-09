import React from "react";
import { useLocation } from "react-router-dom";

const HomePage: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const message = state?.message;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-black to-gray-900 text-gray-200">
      <div className="bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-yellow-500 mb-6">
          Bienvenido a Explore Connect
        </h1>
        {message && <p className="text-gray-400 mb-4">{message}</p>}
        <p className="text-gray-400">Ingreso o se registró correctamente.</p>
      </div>
    </div>
  );
};

export default HomePage;
