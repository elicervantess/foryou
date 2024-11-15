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
import Modal from "../components/Modal";
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
    if (!token) {
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
    <div className="min-h-screen">
      <div className="p-8 max-w-6xl mx-auto mt-10 font-sans">
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
                <LikeButton hasLiked={hasLiked} onToggle={handleLikeToggle} />A{" "}
                {likes} personas les gusta este lugar
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
              containerStyle={{ width: "100%", height: "300px" }}
              mapId="44ee8e50b046cd6f"
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
        <Modal
          isOpen={showAlert}
          onClose={() => setShowAlert(false)}
          title="Atención"
        >
          <p>Debes registrarte o iniciar sesión para poder hacer reservas.</p>
        </Modal>
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
