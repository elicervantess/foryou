import React, { memo, useEffect, useRef, useState } from "react";

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
  canClick?: boolean;
  showRoute?: boolean;
}

const MapComponent: React.FC<MapComponentProps & { className?: string }> = ({
  places,
  center,
  containerStyle,
  mapId,
  onMapClick,
  className,
  canClick,
  showRoute,
  userLocation,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [clickMarker, setClickMarker] = useState<google.maps.Marker | null>(
    null
  );

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom: 13,
        mapId: mapId,
      });

      if (canClick) {
        mapInstance.current.addListener(
          "click",
          (e: google.maps.MapMouseEvent) => {
            if (e.latLng) {
              onMapClick(e.latLng.lat(), e.latLng.lng());

              // Elimina el marcador anterior si existe
              if (clickMarker) {
                clickMarker.setMap(null);
              }

              // Crea un nuevo marcador
              const newMarker = new google.maps.Marker({
                position: e.latLng,
                map: mapInstance.current,
              });
              setClickMarker(newMarker);
            }
          }
        );
      }
    }
  }, [mapId, center, onMapClick, clickMarker, canClick]);

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

  useEffect(() => {
    if (mapInstance.current && showRoute && userLocation) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(mapInstance.current);

      const request = {
        origin: new google.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
        destination: new google.maps.LatLng(center.latitude, center.longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Error al obtener la ruta:", status);
        }
      });
    }
  }, [showRoute, userLocation, center]);

  console.log("User Location:", userLocation);

  return (
    <div
      ref={mapRef}
      style={containerStyle}
      className={`border-4 border-teal-400 rounded-xl shadow-lg ${className}`}
    />
  );
};

export default memo(MapComponent);
