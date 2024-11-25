import React, { useEffect, useState } from "react";
import WelcomeComponent from "../components/WelcomeComponent";
import PlaceListComponent from "../components/PlaceListComponent";
import ReservationListComponent from "../components/ReservationListComponent";
import { getCurrentUser } from "../api";

const CreatePage: React.FC = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [selectedPlaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken") || "";
        const user = await getCurrentUser(token);
        setOwnerName(user.fullName);
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <WelcomeComponent ownerName={ownerName} />
      <PlaceListComponent />
      {selectedPlaceId && (
        <ReservationListComponent placeId={selectedPlaceId} />
      )}
    </div>
  );
};

export default CreatePage;
