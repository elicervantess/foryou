import React, { memo } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface MapComponentProps {
  places: Array<{
    id: string;
    name: string;
    coordinate: {
      latitude: number;
      longitude: number;
    };
    isHighlighted?: boolean;
  }>;
  center: {
    latitude: number;
    longitude: number;
  };
  containerStyle: {
    width: string;
    height: string;
  };
}

const MapComponent: React.FC<MapComponentProps> = ({
  places,
  center,
  containerStyle,
}) => {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: center.latitude, lng: center.longitude }}
      zoom={15}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={{
            lat: place.coordinate.latitude,
            lng: place.coordinate.longitude,
          }}
          title={place.name}
          icon={
            place.isHighlighted
              ? {
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }
              : undefined
          }
        />
      ))}
    </GoogleMap>
  );
};

export default memo(MapComponent);
