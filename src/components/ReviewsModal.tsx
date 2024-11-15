import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview, NewReviewDto } from "../api";

interface Review {
  id: number;
  comment: string;
  rating: number;
  placeId: number;
}

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  placeId: number;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose,
  reviews,
  placeId,
}) => {
  if (!isOpen) return null;

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentReviews, setCurrentReviews] = useState<Review[]>(reviews);

  const handleCreateReview = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Usuario no autenticado");
      return;
    }

    const newReview: NewReviewDto = {
      comment: newComment,
      rating: newRating,
      placeId,
    };

    try {
      await createReview(newReview, token);
      console.log("Reseña creada");
      // Actualiza las reseñas localmente
      setCurrentReviews([...currentReviews, { ...newReview, id: Date.now() }]);
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      console.error("Error al crear la reseña:", error);
    }
  };

  const averageRating =
    currentReviews.length > 0
      ? currentReviews.reduce((acc, review) => acc + review.rating, 0) /
        currentReviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: currentReviews.filter((review) => review.rating === rating).length,
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
                      style={{
                        width: `${(count / currentReviews.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-600">{count}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Crear Reseña
              </h3>
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-3xl cursor-pointer transition-transform transform hover:scale-125 ${
                      (hoverRating || newRating) >= star
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
              <textarea
                className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Escribe tu reseña aquí..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleCreateReview}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-colors transform hover:scale-105"
              >
                Enviar Reseña
              </button>
            </div>
          </div>
          <div className="flex-1 pl-6 overflow-y-auto max-h-[60vh]">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Reseñas
            </h3>
            <ul className="space-y-4">
              {currentReviews.map((review, index) => (
                <li key={index} className="border-b pb-2 rounded-lg shadow-sm">
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
