import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById, toggleLike } from "../api";
import { ApiPlaceResponse } from "../api";
import PlaceDetails from "../components/PlaceDetails";
import PromotionsList from "../components/PromotionsList";
import MapComponent from "../components/MapComponent";
import { useAuth } from "../AuthContext";
import Rating from "../components/Rating";
import ReviewsModal from "../components/ReviewsModal";
import LikeButton from "../components/LikeButton";
import PlaceHeader from "../components/PlaceHeader";
import { motion } from "framer-motion";
import ReservationModal from "../components/ReservationModal";

const PlacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<ApiPlaceResponse | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { token } = useAuth();
  const [isReservationModalOpen, setIsReservationModalOpen] =
    useState<boolean>(false);

  const isAuthenticated = !!token;

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (id) {
          const data = await getPlaceById(id);
          setPlace(data);
          setLikes(data.likes ?? 0);

          const storedHasLiked = localStorage.getItem(
            `hasLiked-${id}-${token}`
          );
          setHasLiked(
            (storedHasLiked === "true" || data.userHasLiked) ?? false
          );
        }
      } catch (error) {
        console.error("Error al obtener los detalles del lugar:", error);
      }
    };
    fetchPlace();
  }, [id, token]);

  const handleLikeToggle = async () => {
    if (!token) {
      setShowAlert(true);
      return;
    }

    if (id) {
      try {
        const updatedPlace = await toggleLike(id, token);
        setLikes(updatedPlace.likes ?? 0);
        setHasLiked(updatedPlace.userHasLiked ?? false);

        localStorage.setItem(
          `hasLiked-${id}-${token}`,
          String(updatedPlace.userHasLiked)
        );
      } catch (error) {
        console.error("Error al cambiar el estado de like:", error);
      }
    }
  };

  const handleReservationClick = () => {
    if (!isAuthenticated) {
      setShowAlert(true);
    } else {
      setIsReservationModalOpen(true);
    }
  };

  const handleReviewsClick = () => {
    setIsReviewsModalOpen(true);
  };

  const fetchPlaceData = async () => {
    const updatedPlace = await getPlaceById(id ?? "");
    setPlace(updatedPlace);
  };

  useEffect(() => {
    if (!isReviewsModalOpen) {
      fetchPlaceData();
    }
  }, [isReviewsModalOpen]);

  if (!place) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  const averageRating =
    place.reviews.length > 0
      ? place.reviews.reduce((acc, review) => acc + review.rating, 0) /
        place.reviews.length
      : 0;

  return (
    <div className="min-h-screen pt-4">
      <div className="pt-12 p-8 max-w-6xl mx-auto mt-10 font-sans">
        <PlaceHeader name={place.name} imageUrl={place.imageUrl ?? ""} />
        <div className="flex flex-col md:flex-row items-start mt-8">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PlaceDetails
              description={place.description}
              address={place.address}
              category={place.category}
              openingHours={place.openingHours}
            />
            <div className="mt-6">
              <button
                onClick={handleReservationClick}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity duration-300"
              >
                Reserva
              </button>
              <p className="mt-4 flex items-center">
                <LikeButton
                  hasLiked={hasLiked}
                  onToggle={handleLikeToggle}
                  isAuthenticated={isAuthenticated}
                />
                A {likes} personas les gusta este lugar
              </p>
              <Rating
                averageRating={averageRating}
                totalReviews={place.reviews.length}
                onClick={handleReviewsClick}
              />
            </div>
          </motion.div>
          <motion.div
            className="flex-1 ml-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapComponent
              places={[
                {
                  id: place.id,
                  name: place.name,
                  coordinate: place.coordinate,
                  isHighlighted: true,
                },
              ]}
              center={place.coordinate}
              containerStyle={{ width: "100%", height: "100%" }}
              mapId="tu-map-id"
              onMapClick={(lat, lng) => {
                console.log(
                  `Mapa clicado en latitud: ${lat}, longitud: ${lng}`
                );
              }}
            />
          </motion.div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Promociones</h2>
          <PromotionsList placeId={place.id} />
        </div>
        <ReviewsModal
          isOpen={isReviewsModalOpen}
          onClose={() => setIsReviewsModalOpen(false)}
          reviews={place.reviews.map((review) => ({
            ...review,
            placeId: review.placeId ?? 0,
          }))}
          placeId={Number(place.id)}
        />
        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ease-out"
            >
              <h2 className="text-xl font-bold mb-4 text-center">Atención</h2>
              <p className="mb-6 text-center">
                Debes registrarte o iniciar sesión para poder crear una reserva.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAlert(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          placeId={place.id}
        />
      </div>
    </div>
  );
};

export default PlacePage;
