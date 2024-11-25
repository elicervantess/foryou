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
        className="bg-white rounded-2xl p-8 w-11/12 max-w-lg relative shadow-lg"
      >
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 absolute top-4 right-4 z-10 bg-white p-2 rounded-full"
          onClick={onClose}
        >
          Cerrar
        </motion.button>
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          alt={placeName}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold mb-2"
        >
          {placeName}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 mb-1"
        >
          Fecha: {formattedDate}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 mb-1"
        >
          Hora: {formattedTime}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 mb-4"
        >
          Personas: {numberOfPeople}
        </motion.p>
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
            containerStyle={{ width: "100%", height: "250px" }}
            mapId="your-map-id"
            userLocation={userLocation ?? undefined}
            onMapClick={() => {
              console.log("Mapa clicado");
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between"
        >
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            onClick={() => navigate(`/place/${placeId}`)}
          >
            Ver más detalles
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            onClick={() => {
              if (userLocation) {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${coordinates.latitude},${coordinates.longitude}`,
                  "_blank"
                );
              }
            }}
          >
            Cómo llegar
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReservaModal;
