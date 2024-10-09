import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import GoogleAuth from "../components/GoogleAuth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      navigate("/home", { state: { message: "Ingreso correctamente" } });
    } catch (error) {
      console.error("Login failed:", error);
      setError("Contraseña o correo incorrecto");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-gray-200">
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold text-white mb-6">
          Login With ExploreConnect
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-left">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-400 transition duration-300 text-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-400 transition duration-300 text-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <GoogleAuth />
        </div>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
