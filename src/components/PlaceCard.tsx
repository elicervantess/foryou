import React from "react";
import { useNavigate } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "./3d-card";

interface PlaceCardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  category: string;
  openingHours: string;
  coordinate: { latitude: number; longitude: number };
  rating: number; // Añadido para la calificación
}

const categoryColors: { [key: string]: string } = {
  CAFETERIA: "bg-yellow-100",
  RESTAURANT: "bg-red-100",
  CULTURAL: "bg-blue-100",
  RECREATIONAL: "bg-green-100",
  EVENT: "bg-purple-100",
};

const PlaceCard: React.FC<{
  place: PlaceCardProps;
  onMouseEnter: () => void;
}> = ({ place, onMouseEnter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/place/${place.id}`);
  };

  // Formatear el horario
  const formattedHours = place.openingHours.replace("-", "a");

  return (
    <CardContainer className="inter-var mb-0" onMouseEnter={onMouseEnter}>
      <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-gray-800 border-gray-400 w-auto sm:w-[18rem] h-auto rounded-xl p-4 border bg-white">
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-white"
        >
          {place.name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <span
            className={`text-sm font-medium px-2 py-1 rounded ${
              categoryColors[place.category]
            } text-black`}
          >
            {place.category}
          </span>{" "}
          - <span className="font-bold">De</span>{" "}
          <span className="text-sm font-bold text-neutral-700">
            {formattedHours}
          </span>
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {place.imageUrl ? (
            <img
              src={place.imageUrl}
              alt={place.name}
              className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            />
          ) : (
            <div className="h-40 bg-gray-300 flex items-center justify-center rounded-xl">
              <span className="text-gray-600">Sin imagen</span>
            </div>
          )}
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          <CardItem
            translateZ={20}
            as="button"
            onClick={handleClick}
            className="px-3 py-1 rounded-xl text-sm font-bold text-blue-600 hover:text-blue-700 transition duration-300"
          >
            Ver más →
          </CardItem>
          <div className="text-sm font-bold text-gray-700">
            ⭐ {place.rating.toFixed(1)}
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default PlaceCard;
