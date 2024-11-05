import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  places: Array<{
    id: string;
    name: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
  }>;
}

const containerStyle = {
  width: "100%",
  height: "400px",
  border: "2px solid #78D1D2",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const center = {
  lat: -12.135216217218664,
  lng: -77.02182856775626,
};

const MapComponent: React.FC<MapComponentProps> = ({ places }) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obteniendo la ubicación del usuario:", error);
        }
      );
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDTW5hhttoJGo7usEohzDPfub_KR6KFTRU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {places.map((place) => (
          <Marker
            key={place.id}
            position={{
              lat: place.coordinate.latitude,
              lng: place.coordinate.longitude,
            }}
            title={place.name}
          />
        ))}
        {userLocation && (
          <Marker
            position={userLocation}
            title="Tu ubicación"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
