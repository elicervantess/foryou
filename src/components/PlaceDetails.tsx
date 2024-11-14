import React from "react";
import { FaMapMarkerAlt, FaClock, FaTag } from "react-icons/fa";

interface PlaceDetailsProps {
  description: string;
  address: string;
  category: string;
  openingHours: string;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  description,
  address,
  category,
  openingHours,
}) => (
  <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
    <p className="mb-4 text-gray-800 text-lg font-medium">{description}</p>
    <div className="flex items-center mb-3">
      <FaMapMarkerAlt className="text-red-500 mr-2" />
      <span className="font-semibold text-gray-700">Dirección:</span>
      <span className="ml-2 text-gray-600">{address}</span>
    </div>
    <div className="flex items-center mb-3">
      <FaTag className="text-green-500 mr-2" />
      <span className="font-semibold text-gray-700">Categoría:</span>
      <span className="ml-2 text-gray-600">{category}</span>
    </div>
    <div className="flex items-center">
      <FaClock className="text-blue-500 mr-2" />
      <span className="font-semibold text-gray-700">Horario de Apertura:</span>
      <span className="ml-2 text-gray-600">{openingHours}</span>
    </div>
  </div>
);

export default PlaceDetails;
