import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import GoogleAuth from "../components/GoogleAuth";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hasPlace, setHasPlace] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const role = hasPlace ? "OWNER" : "USER";
    try {
      const response = await register(email, name, password, hasPlace);
      console.log("Register successful:", response);
      navigate("/home");
    } catch (error) {
      console.error("Register failed:", error);
      setError("Error en el registro. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200">
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-400 transition duration-300 text-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Name</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-400 transition duration-300 text-gray-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-400 transition duration-300 text-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">
              Do you have a place to publish?
            </label>
            <input
              type="checkbox"
              className="mt-1"
              checked={hasPlace}
              onChange={(e) => setHasPlace(e.target.checked)}
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
