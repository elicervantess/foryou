import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeButtonProps {
  hasLiked: boolean;
  onToggle: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ hasLiked, onToggle }) => {
  console.log("Estado de hasLiked:", hasLiked);
  return (
    <button onClick={onToggle} className="mr-2">
      {hasLiked ? (
        <FaHeart className="text-2xl text-red-500" />
      ) : (
        <FaRegHeart className="text-2xl text-gray-500" />
      )}
    </button>
  );
};

export default LikeButton;
