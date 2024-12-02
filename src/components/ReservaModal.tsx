import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import { getPlaceById, ApiPlaceResponse } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ReservaModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: number;
  placeName: string;
  date: string;
  numberOfPeople: number;
  imageUrl: string;
}

const ReservaModal: React.FC<ReservaModalProps> = ({
  isOpen,
  onClose,
  placeId,
  placeName,
  date,
  numberOfPeople,
  imageUrl,
}) => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [userLocation, setUserLocation] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | undefined
  >(undefined);
  const navigate = useNavigate();
  const [showRoute, setShowRoute] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const place: ApiPlaceResponse = await getPlaceById(placeId.toString());
        setCoordinates(place.coordinate);
      } catch (error) {
        console.error("Error al obtener las coordenadas del lugar:", error);
      }
    };

    if (isOpen) {
      fetchCoordinates();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      );
    }
  }, [isOpen, placeId]);

  if (!isOpen || !coordinates) return null;

  const reservationDate = new Date(date);
  const formattedDate = reservationDate.toLocaleDateString();
  const formattedTime = reservationDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-6 w-11/12 max-w-4xl relative shadow-2xl flex flex-col md:flex-row border border-gray-300"
      >
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 absolute top-2 right-2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-red-100 transition"
          onClick={onClose}
        >
          ✖
        </motion.button>
        <div className="md:w-1/2 pr-4 mb-4 md:mb-0">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={imageUrl}
            alt={placeName}
            className="w-full h-64 object-cover rounded-xl mb-4 shadow-md"
          />
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4 text-gray-800"
          >
            {placeName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-gray-800 mb-2"
          >
            📅 Fecha: {formattedDate}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-gray-800 mb-2"
          >
            ⏰ Hora: {formattedTime}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-gray-800 mb-4"
          >
            👥 Personas: {numberOfPeople}
          </motion.p>
        </div>
        <div className="md:w-1/2 pl-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <MapComponent
              places={[
                {
                  id: placeId.toString(),
                  name: placeName,
                  coordinate: coordinates,
                },
              ]}
              center={coordinates}
              containerStyle={{
                width: "100%",
                height: "350px",
              }}
              mapId="your-map-id"
              userLocation={userLocation ?? undefined}
              onMapClick={() => {
                console.log("Mapa clicado");
              }}
              canClick={true}
              showRoute={showRoute}
            />
          </motion.div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition"
              onClick={() => navigate(`/place/${placeId}`)}
            >
              Ver más detalles del Lugar
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
              onClick={() => setShowRoute(true)}
            >
              Mostrar Ruta
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReservaModal;
