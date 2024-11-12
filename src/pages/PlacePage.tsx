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

const PlacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<ApiPlaceResponse | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (id) {
          const data = await getPlaceById(id);
          console.log("Datos del lugar:", data);
          setPlace(data);
          setLikes(data.likes ?? 0);

          // Usa el token como parte de la clave para almacenar el estado de like
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
        console.log("Like toggle realizado");
        setLikes(updatedPlace.likes ?? 0);
        setHasLiked(updatedPlace.userHasLiked ?? false);

        // Guarda el estado de hasLiked en localStorage usando el ID del lugar y el token
        localStorage.setItem(
          `hasLiked-${id}-${token}`,
          String(updatedPlace.userHasLiked)
        );
      } catch (error) {
        console.error("Error al cambiar el estado de like:", error);
      }
    }
  };

  if (!place) {
    return <div>Cargando...</div>;
  }

  const averageRating =
    place.reviews.length > 0
      ? place.reviews.reduce((acc, review) => acc + review.rating, 0) /
        place.reviews.length
      : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-8 font-sans">
      <h1 className="text-4xl font-extrabold mb-4 text-center">{place.name}</h1>
      <div className="flex flex-col md:flex-row items-start">
        <div className="flex-1">
          <div className="bg-gray-200 w-full h-64 rounded-lg overflow-hidden mb-4">
            {place.imageUrl ? (
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 ml-6">
          <PlaceDetails
            description={place.description}
            address={place.address}
            category={place.category}
            openingHours={place.openingHours}
          />
          <div className="mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300">
              Reserva
            </button>
            <p className="mt-4 flex items-center">
              <LikeButton hasLiked={hasLiked} onToggle={handleLikeToggle} />A{" "}
              {likes} personas les gusta este lugar
            </p>
            <Rating
              averageRating={averageRating}
              totalReviews={place.reviews.length}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <MapComponent
          places={[
            {
              id: place.id,
              name: place.name,
              coordinate: place.coordinate,
            },
          ]}
          center={place.coordinate}
          containerStyle={{ width: "100%", height: "300px" }}
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Promociones</h2>
        <PromotionsList
          promotions={place.promotions.map((promotion) => ({
            ...promotion,
            id: promotion.id.toString(),
          }))}
        />
      </div>
      <ReviewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={place.reviews}
      />
      <Modal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title="Atención"
        message="Debes iniciar sesión o registrarte para dar like."
      />
    </div>
  );
};

export default PlacePage;
