import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-lg">
      <div className="text-white text-2xl font-bold tracking-wider">
        ExploreConnect
      </div>
      <div className="space-x-4">
        <a
          href="/"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/login"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          Login
        </a>
        <a
          href="/register"
          className="text-white hover:text-gray-300 transition-colors duration-300"
        >
          Register
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
