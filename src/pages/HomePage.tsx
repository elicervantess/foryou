import React, { useEffect, useState } from "react";
import { getAllPlacesForMap, ApiPlaceResponse } from "../api";
import MapComponent from "../components/MapComponent";
import PlaceCard from "../components/PlaceCard";
import SearchBar from "../components/SearchBar";
import AnimatedBackground from "../components/AnimatedBackground";
import Pagination from "../components/Pagination";

const HomePage: React.FC = () => {
  const [places, setPlaces] = useState<ApiPlaceResponse[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<ApiPlaceResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [highlightedPlace, setHighlightedPlace] =
    useState<ApiPlaceResponse | null>(null);
  const itemsPerPage = 9;

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

  const totalPages = Math.ceil(filteredPlaces.length / itemsPerPage);

  return (
    <div className="container mx-auto p-0 relative overflow-hidden">
      <AnimatedBackground />
      <div className="sticky top-0 z-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex mt-4 relative z-20">
        <div
          className="w-full lg:w-2/3 p-2"
          style={{
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="grid grid-cols-3 gap-y-0 gap-x-4">
            {paginatedPlaces.map((place) => {
              const averageRating =
                place.reviews.length > 0
                  ? place.reviews.reduce(
                      (sum, review) => sum + review.rating,
                      0
                    ) / place.reviews.length
                  : 0;

              return (
                <PlaceCard
                  key={place.id}
                  place={{ ...place, rating: averageRating }}
                  onMouseEnter={() => setHighlightedPlace(place)}
                />
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          )}
        </div>
        <div
          className="w-full lg:w-1/3 p-2 sticky top-0"
          style={{ height: "500px", marginTop: "-40px" }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent">
              Ubicación en el mapa:
            </span>
          </h2>
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
            containerStyle={{ width: "100%", height: "100%" }}
            mapId="44ee8e50b046cd6f"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
