import React from "react";

const PromotionsList: React.FC<{
  promotions: {
    id: string;
    description: string;
    discount: number;
    startDate: string;
    endDate: string;
  }[];
}> = ({ promotions }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Promociones</h2>
    {promotions.length > 0 ? (
      promotions.map((promotion) => (
        <div key={promotion.id} className="bg-gray-100 p-4 mb-4 rounded-lg">
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
  </div>
);

export default PromotionsList;
