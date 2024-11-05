import React from "react";
import { useNavigate } from "react-router-dom";

interface PlaceCardProps {
  id: string;
  name: string;
  imageUrl: string | null;
  category: string;
  openingHours: string;
}

const PlaceCard: React.FC<{
  place: PlaceCardProps;
  onMouseEnter: () => void;
}> = ({ place, onMouseEnter }) => {
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  const handleClick = () => {
    navigate(`/place/${place.id}`); // Cambiado de history.push a navigate
  };

  return (
    <div
      className="inline-block w-48 h-48 rounded-lg overflow-hidden shadow-lg m-4 bg-white transform transition duration-500 hover:scale-105 border border-[#75BDE0]"
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
    >
      <div className="relative">
        {place.imageUrl ? (
          <img
            className="w-full h-24 object-cover"
            src={place.imageUrl}
            alt={place.name}
          />
        ) : (
          <div className="w-full h-24 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="px-4 py-2">
        <div className="font-bold text-sm mb-1 text-[#214D72]">
          {place.name}
        </div>
        <p className="text-gray-600 text-xs">{place.category}</p>
        <p className="text-gray-600 text-xs">{place.openingHours}</p>
      </div>
    </div>
  );
};

export default PlaceCard;
