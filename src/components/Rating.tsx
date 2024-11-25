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
      className="flex items-center justify-center p-2 bg-white shadow-sm rounded-md"
      onClick={onClick}
    >
      <div className="flex flex-col items-center mr-2">
        <span className="text-lg font-bold text-gray-900">
          {averageRating.toFixed(2)}
        </span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${
                i < Math.round(averageRating) ? "text-black" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="border-l border-gray-300 h-8 mx-2"></div>
      <div className="flex flex-col items-center ml-2">
        <span className="text-lg font-bold text-gray-900">{totalReviews}</span>
        <span className="text-sm text-black underline">Reseñas</span>
      </div>
    </div>
  );
};

export default Rating;
