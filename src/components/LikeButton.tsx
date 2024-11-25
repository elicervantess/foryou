import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

interface LikeButtonProps {
  hasLiked: boolean;
  onToggle: () => void;
  isAuthenticated: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  hasLiked,
  onToggle,
  isAuthenticated,
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      onToggle();
    }
  };

  return (
    <>
      <button onClick={handleClick} className="mr-2">
        {hasLiked ? (
          <FaHeart className="text-2xl text-red-500" />
        ) : (
          <FaRegHeart className="text-2xl text-gray-500" />
        )}
      </button>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ease-out"
          >
            <h2 className="text-xl font-bold mb-4 text-center">Atención</h2>
            <p className="mb-6 text-center">
              Debes de iniciar sesión o registrarte para poder darle like a este
              lugar.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowAuthModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LikeButton;
