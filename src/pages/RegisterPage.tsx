import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiMapPin,
  FiCompass,
  FiGlobe,
} from "react-icons/fi";
import { register } from "../api";
import GoogleAuth from "../components/GoogleAuth";
import Logo from "../assets/Logo.png";
import FlipWords from "../components/FlipWords";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasPlace, setHasPlace] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 text-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="w-full md:w-1/2 p-6 bg-white bg-opacity-90 backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
            Registro
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full p-2 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
                checked={hasPlace}
                onChange={(e) => setHasPlace(e.target.checked)}
              />
              <span className="text-gray-700">
                ¿Tienes un lugar para rentar?
              </span>
            </label>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-4">
            <GoogleAuth />
          </div>
          <p className="text-center text-gray-600 mt-4 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, 5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                },
              }}
            >
              <FiMapPin className="absolute top-8 left-8 text-4xl text-blue-300 opacity-50" />
            </motion.div>
            <motion.div
              animate={{
                x: [0, -10, 0],
                y: [0, -5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              <FiCompass className="absolute bottom-8 right-8 text-4xl text-blue-300 opacity-50" />
            </motion.div>
            <motion.div
              animate={{
                x: [0, 5, 0],
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 1,
                },
              }}
            >
              <FiGlobe className="absolute top-1/2 right-8 text-4xl text-blue-300 opacity-50" />
            </motion.div>
          </motion.div>

          <motion.div className="relative z-10 mb-8">
            <img src={Logo} alt="Logo" className="h-32 w-32 object-contain" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            className="text-center relative z-10"
          >
            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              ExploreConnect
            </h2>
            <p className="text-xl font-semibold mb-2 text-blue-100">
              Únete a nuestra comunidad
            </p>
            <div className="text-3xl font-bold text-yellow-300">
              <FlipWords words={["explora", "conecta", "comparte"]} />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-4 right-4 text-blue-200 text-sm"
          >
            Descubre. Conecta. Crea.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
