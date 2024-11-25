import React from "react";
import { ReservationSummaryDto } from "../api";

interface ReservationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: ReservationSummaryDto;
}

const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  isOpen,
  onClose,
  reservation,
}) => {
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalles de la Reserva</h2>
        <p>
          <strong>Fecha:</strong> {reservation.date}
        </p>
        <p>
          <strong>Personas:</strong> {reservation.numberOfPeople}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition mt-4"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  ) : null;
};

export default ReservationDetailsModal;
