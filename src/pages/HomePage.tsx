import React, { useEffect, useState } from "react";
import { getAllPlacesForMap, ApiPlaceResponse } from "../api";
import MapComponent from "../components/MapComponent";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";

const HomePage: React.FC = () => {
  const [places, setPlaces] = useState<ApiPlaceResponse[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<ApiPlaceResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [highlightedPlace, setHighlightedPlace] =
    useState<ApiPlaceResponse | null>(null);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getAllPlacesForMap();
        setPlaces(data);
        setFilteredPlaces(data);
      } catch (error) {
        console.error("Error al obtener lugares:", error);
      }
    };
    fetchPlaces();
  }, []);

  const handleSearch = (query: string, category: string) => {
    let filtered = places;
    if (query) {
      filtered = places.filter((place) =>
        place.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter((place) => place.category === category);
    }
    setFilteredPlaces(filtered);
    setCurrentPage(0);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredPlaces.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedPlaces = filteredPlaces.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="container mx-auto p-8">
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap mt-6">
        <div className="w-full lg:w-1/2 p-2">
          <div className="flex flex-wrap justify-center">
            {paginatedPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onMouseEnter={() => setHighlightedPlace(place)}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            {currentPage > 0 && (
              <button
                onClick={handlePrevPage}
                className="bg-blue-600 text-white rounded-full px-4 py-2"
              >
                Anterior
              </button>
            )}
            <span className="text-gray-700 font-semibold">
              Página {currentPage + 1} de{" "}
              {Math.ceil(filteredPlaces.length / itemsPerPage)}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-blue-600 text-white rounded-full px-4 py-2"
              disabled={
                (currentPage + 1) * itemsPerPage >= filteredPlaces.length
              }
            >
              Siguiente
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-2">
          <MapComponent
            places={highlightedPlace ? [highlightedPlace] : paginatedPlaces}
            center={
              highlightedPlace
                ? highlightedPlace.coordinate
                : paginatedPlaces[0]?.coordinate || {
                    latitude: 0,
                    longitude: 0,
                  }
            }
            containerStyle={{ width: "100%", height: "400px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
