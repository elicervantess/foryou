import React, { useEffect, useState, useRef } from "react";
import { getUserReservations, UserReservation, getPlaceById } from "../api";
import ReservaCard from "../components/ReservaCard";
import ReservaModal from "../components/ReservaModal";
import CountdownTimer from "../components/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<UserReservation[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<UserReservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loader = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("authToken") || "";
        const data = await getUserReservations(token);

        const reservationsWithImages = await Promise.all(
          data.map(async (reservation) => {
            const place = await getPlaceById(reservation.placeId.toString());
            return {
              ...reservation,
              imageUrl: place.imageUrl || "",
            };
          })
        );

        reservationsWithImages.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setReservations(reservationsWithImages);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleCardClick = (reservation: UserReservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null);
  };

  const now = new Date();
  const pastReservations = reservations
    .filter((reservation) => new Date(reservation.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const futureReservations = reservations.filter(
    (reservation) => new Date(reservation.date) >= now
  );

  const nextReservation = futureReservations[0];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        Mis Reservas
      </h1>
      {nextReservation && (
        <div className="mb-6">
          <CountdownTimer targetDate={nextReservation.date} />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl font-semibold mb-4 text-blue-700 sticky top-0 bg-gray-100 z-10">
            Reservas Pasadas
          </h2>
          <div className="overflow-y-auto h-[32rem] scrollbar-hide">
            {pastReservations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl text-gray-600 mb-4">
                  No tienes reservas pasadas.
                </p>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
                  onClick={() => navigate("/")}
                >
                  Explora lugares
                </button>
              </div>
            ) : (
              pastReservations.map((reservation, index) => (
                <ReservaCard
                  key={index}
                  placeName={reservation.placeName}
                  date={reservation.date}
                  numberOfPeople={reservation.numberOfPeople}
                  imageUrl={reservation.imageUrl || ""}
                  onClick={() => handleCardClick(reservation)}
                />
              ))
            )}
            <div ref={loader} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <h2 className="text-3xl font-semibold mb-4 text-blue-700 sticky top-0 bg-gray-100 z-10">
            Próximas Reservas
          </h2>
          <div className="overflow-y-auto h-[32rem] scrollbar-hide">
            {futureReservations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl text-gray-600 mb-4">
                  No tienes próximas reservas.
                </p>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
                  onClick={() => navigate("/")}
                >
                  Explora lugares
                </button>
              </div>
            ) : (
              futureReservations.map((reservation, index) => (
                <ReservaCard
                  key={index}
                  placeName={reservation.placeName}
                  date={reservation.date}
                  numberOfPeople={reservation.numberOfPeople}
                  imageUrl={reservation.imageUrl || ""}
                  onClick={() => handleCardClick(reservation)}
                />
              ))
            )}
            <div ref={loader} />
          </div>
        </motion.div>
      </div>
      {selectedReservation && (
        <ReservaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          placeId={selectedReservation.placeId}
          placeName={selectedReservation.placeName}
          date={selectedReservation.date}
          numberOfPeople={selectedReservation.numberOfPeople}
          imageUrl={selectedReservation.imageUrl || ""}
        />
      )}
    </div>
  );
};

export default ReservationPage;
