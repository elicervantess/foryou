import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { login } from "../api";
import GoogleAuth from "../components/GoogleAuth";
import Logo from "../assets/Logo.png";
import FlipWords from "../components/FlipWords";
import AnimatedBackground from "../components/AnimatedBackground";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isPresent = useIsPresent();
  const location = useLocation();

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  useEffect(() => {
    const cleanup = () => {};
    return cleanup;
  }, []);

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isPresent ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center min-h-screen relative"
    >
      <AnimatedBackground />
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-white bg-opacity-90">
        <div className="w-full md:w-1/2 p-8 bg-white bg-opacity-90 backdrop-blur-md">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
            Bienvenido
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-6">
            <GoogleAuth />
          </div>
          <p className="text-center text-gray-600 mt-6">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 mb-8">
            <img src={Logo} alt="Logo" className="h-32 w-32 object-contain" />
          </div>
          <div className="text-center relative z-10">
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              ExploreConnect
            </h2>
            <p className="text-xl font-semibold mb-2 text-blue-100">
              Crea sitios web
            </p>
            <div className="text-3xl font-bold text-yellow-300">
              <FlipWords words={["hermosos", "responsivos", "modernos"]} />
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-blue-200 text-sm">
            Descubre. Conecta. Crea.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
