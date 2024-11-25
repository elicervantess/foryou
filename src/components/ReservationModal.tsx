import React, { useState, useEffect } from "react";
import { createReservation, getPlaceById, ReservationRequest } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../AuthContext";
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";

const ModalContainer = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: auto;
  padding: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  color: #2c7695;
  z-index: 10;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: #ff0000;
    transform: scale(1.1);
  }
`;

const FormTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #2c7695;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #2c7695, #75bde0);
  color: white;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  placeId: string;
}

const FormSchema = z.object({
  date: z.date({
    required_error: "La fecha es requerida.",
  }),
  time: z.string().nonempty("La hora es requerida."),
  numberOfPeople: z.number().min(1, "Debe haber al menos una persona."),
});

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  placeId,
}) => {
  const { token } = useAuth();
  const [placeDetails, setPlaceDetails] = useState<any>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");
  const watchedNumberOfPeople = watch("numberOfPeople");

  useEffect(() => {
    if (placeId) {
      const fetchPlaceDetails = async () => {
        try {
          const details = await getPlaceById(placeId);
          setPlaceDetails(details);
          generateAvailableTimes(details.openingHours);
        } catch (error) {
          console.error("Error al obtener los detalles del lugar:", error);
        }
      };
      fetchPlaceDetails();
    }
  }, [placeId]);

  const generateAvailableTimes = (openingHours: string) => {
    const [start, end] = openingHours.split("-");
    const startTime = parseInt(start.replace(":", ""));
    const endTime = parseInt(end.replace(":", ""));
    const times = [];

    for (let i = startTime; i <= endTime; i += 100) {
      const hour = Math.floor(i / 100)
        .toString()
        .padStart(2, "0");
      const minutes = (i % 100).toString().padStart(2, "0");
      times.push(`${hour}:${minutes}`);
    }

    setAvailableTimes(times);
  };

  const onSubmit = async (data: any) => {
    if (!placeId) {
      console.error("Falta el placeId");
      return;
    }

    const [hours, minutes] = data.time.split(":");
    const date = new Date(data.date);
    date.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    const reservationRequest: ReservationRequest = {
      placeId: Number(placeId),
      date: utcDate.toISOString(),
      numberOfPeople: Number(data.numberOfPeople),
    };

    console.log("Datos de la reserva:", reservationRequest);

    try {
      const response = await createReservation(reservationRequest, token ?? "");
      console.log("Reserva creada:", response);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
    }
  };

  if (!isOpen || !placeDetails) return null;

  const averageRating =
    placeDetails.reviews.length > 0
      ? placeDetails.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0
        ) / placeDetails.reviews.length
      : 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ModalContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-xl p-6"
      >
        {!showSuccessMessage && (
          <CloseButton onClick={onClose}>&times;</CloseButton>
        )}
        {showSuccessMessage ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg font-bold text-green-800">
              Registro exitoso, te llegará un correo con la información de tu
              reserva
            </p>
            <button
              onClick={() => {
                onClose();
                window.location.reload();
              }}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              Aceptar
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 pr-8 bg-white p-6 rounded-lg shadow-lg"
            >
              <FormTitle className="text-blue-600 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Reserva tu lugar
              </FormTitle>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <FormField>
                      <p className="font-medium text-gray-700">Fecha</p>
                      <DatePicker
                        selected={field.value || null}
                        onChange={(date) => setValue("date", date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                        placeholderText="Seleccione la fecha"
                        calendarClassName="rounded-lg shadow-lg"
                        dayClassName={(date) =>
                          "text-center hover:bg-blue-200 transition-colors duration-200" +
                          (date.getDay() === 0 ? " text-red-500" : "")
                        }
                        todayButton="Hoy"
                        popperClassName="react-datepicker-popper"
                        minDate={new Date()}
                      />
                      <FaCalendarAlt className="absolute left-2 top-9 text-gray-500" />
                    </FormField>
                  )}
                />
                <FormField>
                  <p className="font-medium text-gray-700">Hora</p>
                  <select
                    {...register("time", { required: true })}
                    className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Selecciona una hora</option>
                    {availableTimes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField>
                  <p className="font-medium text-gray-700">
                    Número de personas
                  </p>
                  <input
                    type="number"
                    min="1"
                    {...register("numberOfPeople", {
                      required: "Mínimo 1 persona para poder reservar",
                      valueAsNumber: true,
                      validate: (value) =>
                        !isNaN(value) || "Mínimo 1 persona para poder reservar",
                      min: {
                        value: 1,
                        message: "Mínimo 1 persona para poder reservar",
                      },
                    })}
                    onChange={(e) =>
                      setValue("numberOfPeople", parseInt(e.target.value))
                    }
                    className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.numberOfPeople && (
                    <span className="text-red-500">
                      {errors.numberOfPeople.type === "required"
                        ? "Mínimo 1 persona para poder reservar"
                        : "Complete todos los campos"}
                    </span>
                  )}
                </FormField>
                <SubmitButton
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Reservar
                </SubmitButton>
              </form>
            </motion.div>
            <motion.div
              className="flex-1 ml-8 relative bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                <img
                  src={placeDetails.imageUrl}
                  alt={placeDetails.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800">
                  {placeDetails.name}
                </h3>
                <p className="text-gray-600">{placeDetails.category}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-lg font-bold text-gray-900">
                    {averageRating.toFixed(2)}
                  </span>
                  <span className="text-gray-600 ml-2">
                    ({placeDetails.reviews.length} reseñas)
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">
                Información de la reserva
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-700 font-medium flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  Fecha:{" "}
                  {watchedDate
                    ? watchedDate.toLocaleDateString()
                    : "No seleccionada"}
                </p>
                <p className="text-gray-700 font-medium flex items-center mt-2">
                  <FaClock className="mr-2 text-blue-500" />
                  Hora: {watchedTime || "No seleccionada"}
                </p>
                <p className="text-gray-700 font-medium flex items-center mt-2">
                  <FaUser className="mr-2 text-blue-500" />
                  Número de personas: {watchedNumberOfPeople || "0"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </ModalContainer>
    </div>
  );
};

export default ReservationModal;
