import { motion } from "framer-motion";
import { FaHeart, FaGift, FaBirthdayCake } from "react-icons/fa";

const BirthdayCard = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
    <motion.div
      className="relative bg-white border-4 border-pink-400 rounded-xl p-8 text-center shadow-2xl"
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-pink-600 text-4xl font-extrabold"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Feliz cumpleaños Emma
      </motion.h1>
      <p className="text-gray-800 text-2xl mt-4">i love u</p>
      <div className="mt-6">
        <motion.span
          className="inline-block bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaBirthdayCake /> <FaHeart />
        </motion.span>
      </div>
      {/* Iconos en los bordes */}
      <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
        <FaGift className="text-pink-500 animate-spin-slow" />
      </div>
      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
        <FaHeart className="text-pink-500 animate-spin-slow" />
      </div>
      <div className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2">
        <FaBirthdayCake className="text-pink-500 animate-spin-slow" />
      </div>
    </motion.div>
  </div>
);

export default BirthdayCard;
