import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-80 bg-gray-800 text-gray-200 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/home"
          className="text-2xl font-bold text-white tracking-wider hover:text-gray-400 transition duration-300"
        >
          ExploreConnect
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="hover:text-gray-400 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-gray-400 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
