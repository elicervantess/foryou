import React from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  averageRating: number;
  totalReviews: number;
  onClick: () => void;
}

const Rating: React.FC<RatingProps> = ({
  averageRating,
  totalReviews,
  onClick,
}) => {
  return (
    <div
      className="flex items-center cursor-pointer p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow border border-gray-200"
      onClick={onClick}
    >
      <span className="text-3xl font-bold text-gray-800">
        {averageRating.toFixed(1)}
      </span>
      <FaStar className="text-yellow-500 ml-2 text-2xl" />
      <span className="ml-4 text-lg text-gray-600">{totalReviews} Reseñas</span>
    </div>
  );
};

export default Rating;
