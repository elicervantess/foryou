import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMapPin,
  FiCompass,
  FiGlobe,
} from "react-icons/fi";
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
    resetForm();
  }, [location, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      localStorage.setItem("authToken", response.token);
      console.log("Login successful:", response);
      navigate("/home");
      window.location.reload(); // Refresca la página
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
      className="flex items-center justify-center min-h-screen relative bg-[#75BDE0]"
    >
      <AnimatedBackground />
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10">
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#2C7695]">
            Bienvenido
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#2C7695] font-semibold mb-2">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#2C7695]" />
                <input
                  type="email"
                  className="w-full p-3 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[#2C7695] font-semibold mb-2">
                Contraseña
              </label>
              <div className="relative">
                <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#2C7695]" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#2C7695] hover:text-[#75BDE0]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-[#2C7695] text-white font-semibold rounded-xl shadow-md hover:bg-[#75BDE0] transition duration-300"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="mt-6">
            <GoogleAuth />
          </div>
          <p className="text-center text-[#2C7695] mt-6">
            ¿No tienes una cuenta?{" "}
            <a
              href="/register"
              className="text-[#75BDE0] hover:underline font-semibold"
            >
              Regístrate aquí
            </a>
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-[#75BDE0] to-[#78D1D2] p-8 text-white relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                x: [0, 10, 0],
                y: [0, 5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              <FiMapPin className="absolute top-8 left-8 text-4xl text-[#214D72] opacity-50" />
            </motion.div>
            <motion.div
              animate={{
                x: [0, -10, 0],
                y: [0, -5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.3,
                },
              }}
            >
              <FiCompass className="absolute bottom-8 right-8 text-4xl text-[#214D72] opacity-50" />
            </motion.div>
            <motion.div
              animate={{
                x: [0, 5, 0],
                y: [0, -10, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
            >
              <FiGlobe className="absolute top-1/2 right-8 text-4xl text-[#214D72] opacity-50" />
            </motion.div>
          </motion.div>

          <motion.div className="relative z-10 mb-8">
            <img src={Logo} alt="Logo" className="h-32 w-32 object-contain" />
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="text-center relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              ExploreConnect
            </h2>
            <p className="text-xl font-semibold mb-2 text-white">
              Únete a nuestra comunidad
            </p>
            <div className="text-2xl sm:text-3xl font-bold text-[#214D72]">
              <FlipWords words={["explora", "conecta", "comparte"]} />
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-4 right-4 text-[#214D72] text-sm font-semibold"
          >
            Descubre. Conecta. Crea.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
