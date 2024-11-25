import React from "react";

interface ReservaCardProps {
  placeName: string;
  date: string;
  numberOfPeople: number;
  imageUrl: string;
  onClick: () => void;
}

const ReservaCard: React.FC<ReservaCardProps> = ({
  placeName,
  date,
  numberOfPeople,
  imageUrl,
  onClick,
}) => {
  const reservationDate = new Date(date);
  const formattedDate = reservationDate.toLocaleDateString();
  const formattedTime = reservationDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden mb-6 cursor-pointer hover:shadow-2xl transition-shadow flex"
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-40 h-40">
        <img
          src={imageUrl}
          alt={placeName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <h3 className="text-2xl font-bold text-gray-800">{placeName}</h3>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Fecha:</span> {formattedDate}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Hora:</span> {formattedTime}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Personas:</span> {numberOfPeople}
        </p>
      </div>
    </div>
  );
};

export default ReservaCard;
