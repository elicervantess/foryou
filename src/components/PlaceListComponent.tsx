import React, { useState, useEffect } from "react";
import { getMyPlaces, ApiPlaceResponse } from "../api";
import PlaceModal from "./PlaceModal";

const PlaceListComponent: React.FC = () => {
  const [places, setPlaces] = useState<ApiPlaceResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<ApiPlaceResponse | null>(
    null
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const token = localStorage.getItem("authToken") || "";
        const data = await getMyPlaces(token);
        setPlaces(data);
      } catch (error) {
        console.error("Error al obtener los lugares:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleCreate = () => {
    setSelectedPlace(null);
    setIsModalOpen(true);
  };

  const handleEdit = (place: ApiPlaceResponse) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Mis Lugares</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mb-4"
        onClick={handleCreate}
      >
        Crear Nuevo Lugar
      </button>
      <ul>
        {places.map((place) => (
          <li key={place.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{place.name}</span>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(place)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <PlaceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          place={selectedPlace}
        />
      )}
    </div>
  );
};

export default PlaceListComponent;
