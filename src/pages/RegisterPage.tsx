import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useIsPresent } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiMapPin,
  FiCompass,
  FiGlobe,
} from "react-icons/fi";
import { register, login } from "../api"; // Asegúrate de importar la función de login
import GoogleAuth from "../components/GoogleAuth";
import Logo from "../assets/Logo.png";
import FlipWords from "../components/FlipWords";
import AnimatedBackground from "../components/AnimatedBackground";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hasPlace, setHasPlace] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isPresent = useIsPresent();
  const location = useLocation();

  const resetForm = useCallback(() => {
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setHasPlace(false);
    setError("");
  }, []);

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await register(email, name, password, hasPlace);
      console.log("Register successful");

      // Iniciar sesión automáticamente después del registro
      const loginResponse = await login(email, password);
      localStorage.setItem("authToken", loginResponse.token);

      navigate("/home");
      window.location.reload(); // Refresca la página
    } catch (error) {
      console.error("Register failed:", error);
      setError("Error en el registro. Por favor, intente nuevamente.");
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
        <div className="w-full md:w-1/2 p-6 bg-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-[#2C7695]">
            Registro
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-[#2C7695]" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-[#2C7695]" />
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-2 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-[#2C7695]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className="w-full p-2 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-[#2C7695] hover:text-[#75BDE0]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-[#2C7695]" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar Contraseña"
                className="w-full p-2 pl-10 border border-[#2C7695] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#75BDE0] transition duration-300 bg-white text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute top-3 right-3 text-[#2C7695] hover:text-[#75BDE0]"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#75BDE0]"
                checked={hasPlace}
                onChange={(e) => setHasPlace(e.target.checked)}
              />
              <span className="text-[#2C7695]">
                ¿Tienes un lugar para publicar?
              </span>
            </label>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-[#2C7695] text-white font-semibold rounded-xl shadow-md hover:bg-[#75BDE0] transition duration-300"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-4">
            <GoogleAuth />
          </div>
          <p className="text-center text-[#2C7695] mt-4 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="text-[#75BDE0] hover:underline font-semibold"
            >
              Inicia sesión aquí
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
            transition={{ delay: 0.3, duration: 0 }}
            className="absolute bottom-4 right-4 text-[#214D72] text-sm font-semibold"
          >
            Descubre. Conecta. Crea.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
