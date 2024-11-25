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
  onMapClick: (lat: number, lng: number) => void; // Añadir esta prop
}

const MapComponent: React.FC<MapComponentProps> = ({
  places,
  center,
  containerStyle,
  mapId,
  userLocation,
  onMapClick, // Recibir la prop
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

      // Añadir evento de clic
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

      if (userLocation) {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(mapInstance.current);

        directionsService.route(
          {
            origin: new google.maps.LatLng(
              userLocation.latitude,
              userLocation.longitude
            ),
            destination: new google.maps.LatLng(
              center.latitude,
              center.longitude
            ),
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error("Error al obtener las direcciones:", status);
            }
          }
        );
      }

      return () => {
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [places, center, userLocation]);

  return <div ref={mapRef} style={containerStyle} />;
};

export default memo(MapComponent);
