import React from "react";
import { motion } from "framer-motion";

const PlaceHeader: React.FC<{ name: string; imageUrl: string }> = ({
  name,
  imageUrl,
}) => (
  <div className="flex flex-col items-center mb-8">
    <motion.h1
      className="text-5xl font-extrabold text-blue-600 mb-4 tracking-wide"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {name}
    </motion.h1>
    <div className="relative w-full max-w-2xl">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-72 object-cover rounded-xl shadow-xl"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-80 rounded-b-xl">
        <p className="text-white text-center p-3 font-semibold">{name}</p>
      </div>
    </div>
  </div>
);

export default PlaceHeader;
