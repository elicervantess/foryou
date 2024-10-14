import React from "react";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#75BDE0] via-[#78D1D2] to-[#97DBAE] text-white"
    >
      <div className="text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        >
          Bienvenido a ExploreConnect
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-[#214D72]"
        >
          Fomenta el turismo con nuestras reservas
        </motion.p>
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="mt-8 px-6 py-3 bg-[#214D72] text-white font-semibold rounded-xl shadow-md hover:bg-[#2C7695] transition duration-300"
        >
          Comenzar ahora
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HomePage;
