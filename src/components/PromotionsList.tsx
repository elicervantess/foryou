import React, { useEffect, useState } from "react";
import { Promotion, getPromotionsByPlace } from "../api";
import { useAuth } from "../AuthContext";

interface PromotionsListProps {
  placeId: string;
}

const PromotionsList: React.FC<PromotionsListProps> = ({ placeId }) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPromotions = async () => {
      if (token) {
        try {
          const promotionsData = await getPromotionsByPlace(placeId, token);
          setPromotions(promotionsData);
        } catch (error) {
          console.error(
            `Error al obtener promociones para el lugar con ID ${placeId}:`,
            error
          );
          alert(
            "Hubo un problema al obtener las promociones. Por favor, inténtalo de nuevo más tarde."
          );
        }
      } else {
        console.warn("Token no disponible. No se pueden obtener promociones.");
      }
    };

    fetchPromotions();
  }, [placeId, token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {promotions.length > 0 ? (
        promotions.map((promotion) => (
          <div
            key={promotion.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105"
          >
            {promotion.imageUrl ? (
              <img
                src={promotion.imageUrl}
                alt={promotion.description}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-56 bg-gray-200">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {promotion.description}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Descuento:</strong> {promotion.discount}%
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Válido desde:</strong> {promotion.startDate}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Hasta:</strong> {promotion.endDate}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">
          No hay promociones disponibles en este momento.
        </p>
      )}
    </div>
  );
};

export default PromotionsList;
