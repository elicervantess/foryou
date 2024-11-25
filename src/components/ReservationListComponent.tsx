import React, { useState, useEffect } from "react";
import { getReservationsByOwner, ReservationSummaryDto } from "../api";
import ReservationDetailsModal from "./ReservationDetailModal";

interface ReservationListComponentProps {
  placeId: string;
}

const ReservationListComponent: React.FC<
  ReservationListComponentProps
> = ({}) => {
  const [reservations, setReservations] = useState<ReservationSummaryDto[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationSummaryDto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchReservations = async () => {
      if (token) {
        try {
          const data = await getReservationsByOwner(token);
          setReservations(data);
        } catch (error) {
          console.error("Error al obtener las reservas:", error);
        }
      }
    };

    fetchReservations();
  }, [token]);

  const handleViewDetails = (reservation: ReservationSummaryDto) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Reservas</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservationId} className="mb-2">
            <div className="flex justify-between items-center">
              <span>{reservation.date}</span>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleViewDetails(reservation)}
              >
                Ver Detalles
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedReservation && (
        <ReservationDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          reservation={selectedReservation}
        />
      )}
    </div>
  );
};

export default ReservationListComponent;
