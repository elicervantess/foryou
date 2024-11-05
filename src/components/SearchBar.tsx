import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch(query, category);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 mb-8">
      <div className="flex items-center bg-white rounded-full shadow-md p-4 w-full max-w-xl border border-[#78D1D2]">
        {" "}
        {/* Cambiar max-w-3xl a max-w-xl */}
        <input
          type="text"
          placeholder="¿Dónde?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-l border-gray-300 px-4 py-2 text-gray-700 focus:outline-none"
        >
          <option value="">Categoría</option>
          <option value="RESTAURANT">Restaurante</option>
          <option value="CAFE">Café</option>
          <option value="BAR">Bar</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-[#75BDE0] text-white rounded-full p-2 ml-4 hover:bg-[#214D72] transition duration-300"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
