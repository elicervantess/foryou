import React from "react";

const PlaceDetails: React.FC<{
  description: string;
  address: string;
  category: string;
  openingHours: string;
}> = ({ description, address, category, openingHours }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 rounded-xl">
    <p className="text-lg font-semibold text-gray-800">
      <strong>Descripción:</strong> {description}
    </p>
    <p className="text-lg font-semibold text-gray-800">
      <strong>Dirección:</strong> {address}
    </p>
    <p className="text-lg font-semibold text-gray-800">
      <strong>Categoría:</strong> {category}
    </p>
    <p className="text-lg font-semibold text-gray-800">
      <strong>Horario de Apertura:</strong> {openingHours}
    </p>
  </div>
);

export default PlaceDetails;
