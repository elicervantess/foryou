import React, { memo, useEffect, useRef } from "react";

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
  mapId: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  };
  onMapClick: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps & { className?: string }> = ({
  places,
  center,
  containerStyle,
  mapId,
  onMapClick,
  className,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom: 13,
        mapId: mapId,
      });

      mapInstance.current.addListener(
        "click",
        (e: google.maps.MapMouseEvent) => {
          if (e.latLng) {
            onMapClick(e.latLng.lat(), e.latLng.lng());
          }
        }
      );
    }
  }, [mapId, center, onMapClick]);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setCenter({
        lat: center.latitude,
        lng: center.longitude,
      });

      const markers = places.map((place) => {
        return new google.maps.Marker({
          position: new google.maps.LatLng(
            place.coordinate.latitude,
            place.coordinate.longitude
          ),
          map: mapInstance.current,
          title: place.name,
        });
      });

      return () => {
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [places, center]);

  return (
    <div
      ref={mapRef}
      style={containerStyle}
      className={`border-4 border-teal-400 rounded-xl shadow-lg ${className}`}
    />
  );
};

export default memo(MapComponent);
