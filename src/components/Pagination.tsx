import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      {currentPage > 0 && (
        <button
          onClick={onPrev}
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
        >
          Anterior
        </button>
      )}
      <span className="text-gray-700 font-semibold">
        Página {currentPage + 1} de {totalPages}
      </span>
      {currentPage + 1 < totalPages && (
        <button
          onClick={onNext}
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Pagination;
