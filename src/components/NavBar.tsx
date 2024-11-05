import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiLogIn, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import logoIsotipo from "../assets/logo_isotipo.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const navItems = [
    { to: "/home", icon: <FiHome />, text: "Inicio" },
    { to: "/login", icon: <FiLogIn />, text: "Iniciar sesión" },
    { to: "/register", icon: <FiUserPlus />, text: "Registro" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={logoIsotipo} alt="Logo Isotipo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-[#214D72]">
              ExploreConnect
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                {...item}
                active={activeItem === item.to}
              />
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#214D72] hover:text-[#75BDE0] transition-colors duration-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            navItems={navItems}
            activeItem={activeItem}
            setIsOpen={setIsOpen}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}> = ({ to, icon, text, active }) => (
  <Link to={to} className="relative group px-3 py-2">
    <div className="flex items-center space-x-1 text-[#214D72] group-hover:text-[#75BDE0] transition-colors duration-300">
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
    {active && (
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#75BDE0]"
        layoutId="underline"
      />
    )}
  </Link>
);

const MobileMenu: React.FC<{
  navItems: { to: string; icon: React.ReactNode; text: string }[];
  activeItem: string;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ navItems, activeItem, setIsOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg overflow-hidden"
  >
    <div className="px-4 py-2 space-y-1">
      {navItems.map((item) => (
        <MobileNavLink
          key={item.to}
          {...item}
          active={activeItem === item.to}
          setIsOpen={setIsOpen}
        />
      ))}
    </div>
  </motion.div>
);

const MobileNavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ to, icon, text, active, setIsOpen }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
      active
        ? "bg-[#75BDE0] text-white"
        : "text-[#214D72] hover:bg-[#75BDE0] hover:text-white"
    }`}
    onClick={() => setIsOpen(false)}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{text}</span>
  </Link>
);

export default Navbar;
