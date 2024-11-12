import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-96"
      >
        <h2 className="text-2xl font-extrabold mb-4 text-center text-gray-800">
          {title}
        </h2>
        <p className="mb-6 text-center text-gray-600">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Aceptar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
