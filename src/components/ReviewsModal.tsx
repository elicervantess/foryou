import React from "react";
import { Review } from "../api";
import { FaStar } from "react-icons/fa";

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  reviews,
}) => {
  if (!isOpen) return null;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-8 rounded-2xl max-w-3xl w-full shadow-lg border border-gray-300 transform transition-transform duration-300 ease-in-out scale-95">
        <button
          onClick={onClose}
          className="text-red-500 float-right font-bold hover:text-red-700 transition-colors"
        >
          Cerrar
        </button>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Reseñas
        </h2>
        <div className="flex">
          <div className="flex-1 border-r pr-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Promedio de Estrellas
            </h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
              <FaStar className="text-yellow-500 ml-2 text-3xl" />
            </div>
            <div>
              {ratingDistribution.map(({ rating, count }) => (
                <div key={rating} className="flex items-center mb-2">
                  <span className="text-gray-700 font-bold">
                    {rating} estrellas
                  </span>
                  <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${(count / reviews.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 pl-6 overflow-y-auto max-h-[60vh]">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Reseñas
            </h3>
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="border-b pb-2 rounded-lg shadow-sm"
                >
                  <p className="font-bold text-gray-700 flex items-center">
                    {review.rating} <FaStar className="text-yellow-500 ml-1" />
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
