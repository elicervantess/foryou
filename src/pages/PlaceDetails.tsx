import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../api";
import { ApiPlaceResponse } from "../api";
import { motion } from "framer-motion";

const PlaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<ApiPlaceResponse | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        if (id) {
          const data = await getPlaceById(id);
          setPlace(data);
        }
      } catch (error) {
        console.error("Error al obtener los detalles del lugar:", error);
      }
    };
    fetchPlace();
  }, [id]);

  if (!place) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ color: "#2c3e50" }}>{place.name}</h1>
        <p>
          <strong>Descripción:</strong> {place.description}
        </p>
        <p>
          <strong>Dirección:</strong> {place.address}
        </p>
        <p>
          <strong>Categoría:</strong> {place.category}
        </p>
        <p>
          <strong>Horario de Apertura:</strong> {place.openingHours}
        </p>
        <p>
          <strong>Coordenadas:</strong>{" "}
          {`Latitud: ${place.coordinate.latitude}, Longitud: ${place.coordinate.longitude}`}
        </p>
        <p>
          <strong>Likes:</strong> {place.likes ?? 0}
        </p>

        <h2 style={{ color: "#2980b9" }}>Reseñas</h2>
        {place.reviews.length > 0 ? (
          place.reviews.map((review) => (
            <div
              key={review.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "4px",
                backgroundColor: "#ecf0f1",
              }}
            >
              <p>
                <strong>Comentario:</strong> {review.comment}
              </p>
              <p>
                <strong>Calificación:</strong> {review.rating}
              </p>
            </div>
          ))
        ) : (
          <p>No hay reseñas disponibles.</p>
        )}

        <h2 style={{ color: "#2980b9" }}>Promociones</h2>
        {place.promotions.length > 0 ? (
          place.promotions.map((promotion) => (
            <div
              key={promotion.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #eee",
                borderRadius: "4px",
                backgroundColor: "#ecf0f1",
              }}
            >
              <p>
                <strong>Descripción:</strong> {promotion.description}
              </p>
              <p>
                <strong>Descuento:</strong> {promotion.discount}%
              </p>
              <p>
                <strong>Válido desde:</strong>{" "}
                {new Date(promotion.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Hasta:</strong>{" "}
                {new Date(promotion.endDate).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No hay promociones disponibles.</p>
        )}
      </motion.div>
    </div>
  );
};

export default PlaceDetails;
