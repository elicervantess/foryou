import React from "react";

const PlaceDetails: React.FC<{
  description: string;
  address: string;
  category: string;
  openingHours: string;
}> = ({ description, address, category, openingHours }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <p>
      <strong>Descripción:</strong> {description}
    </p>
    <p>
      <strong>Dirección:</strong> {address}
    </p>
    <p>
      <strong>Categoría:</strong> {category}
    </p>
    <p>
      <strong>Horario de Apertura:</strong> {openingHours}
    </p>
  </div>
);

export default PlaceDetails;
