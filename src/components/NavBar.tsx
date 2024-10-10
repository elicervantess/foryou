import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/home"
            className="text-2xl font-bold tracking-wider hover:text-yellow-300 transition duration-300"
          >
            ExploreConnect
          </Link>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/home" icon={<FiHome />} text="Home" />
            <NavLink to="/login" icon={<FiLogIn />} text="Login" />
            <NavLink to="/register" icon={<FiUserPlus />} text="Register" />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/home" icon={<FiHome />} text="Home" />
            <MobileNavLink to="/login" icon={<FiLogIn />} text="Login" />
            <MobileNavLink
              to="/register"
              icon={<FiUserPlus />}
              text="Register"
            />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
}> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-white hover:text-yellow-300 transition duration-300"
  >
    <motion.div
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {icon}
    </motion.div>
    <span>{text}</span>
  </Link>
);

const MobileNavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
}> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center space-x-2 text-white hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
