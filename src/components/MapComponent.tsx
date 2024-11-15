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
}

const MapComponent: React.FC<MapComponentProps> = ({
  places,
  center,
  containerStyle,
  mapId,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  const styledContainer = {
    ...containerStyle,
    borderRadius: "15px",
    border: "2px solid #214D72",
  };

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: center.latitude, lng: center.longitude },
        zoom: 15,
        mapId: mapId,
      });
    }
  }, [mapId]);

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

      // Forzar redimensionamiento del mapa
      google.maps.event.trigger(mapInstance.current, "resize");

      return () => {
        markers.forEach((marker) => marker.setMap(null));
      };
    }
  }, [places, center]);

  return <div ref={mapRef} style={styledContainer} />;
};

export default memo(MapComponent);
