import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../api";
import { ApiPlaceResponse } from "../api";
import PlaceDetails from "../components/PlaceDetails";
import PromotionsList from "../components/PromotionsList";
import MapComponent from "../components/MapComponent";
import { FaHeart } from "react-icons/fa";

const PlacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<ApiPlaceResponse | null>(null);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (id) {
          const data = await getPlaceById(id);
          setPlace(data);
          setLikes(data.likes ?? 0);
        }
      } catch (error) {
        console.error("Error al obtener los detalles del lugar:", error);
      }
    };
    fetchPlace();
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
    // Aquí podrías hacer una llamada a la API para actualizar los likes en el servidor
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
              <button onClick={handleLike} className="mr-2">
                <FaHeart className="text-red-500" />
              </button>
              A {likes} personas les gusta este lugar
            </p>
            <p>
              <strong>Promedio de Reseñas:</strong> {averageRating.toFixed(1)}{" "}
              ⭐
            </p>
            <p>
              <strong>Total de Reseñas:</strong> {place.reviews.length}
            </p>
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
          center={place.coordinate} // Centrar el mapa en las coordenadas del lugar
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
    </div>
  );
};

export default PlacePage;
