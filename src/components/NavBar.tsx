import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiCalendar,
} from "react-icons/fi";
import logoIsotipo from "../assets/logo_isotipo.png";
import { useAuth } from "../AuthContext";
import { logout, getCurrentUser, UserResponse } from "../api";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");
  const [user, setUser] = useState<UserResponse | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      }
    };
    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    if (token) {
      try {
        await logout(token);
        setToken(null);
        navigate("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  const navItems = [
    { to: "/home", icon: <FiHome />, text: "Inicio" },
    ...(token
      ? [
          { to: "/reservations", icon: <FiCalendar />, text: "Mis reservas" },
          {
            to: "#",
            icon: <FiMenu />,
            text: "Menú",
            onClick: () => {
              setIsOpen(!isOpen);
              setActiveItem("menu");
            },
          },
        ]
      : [
          { to: "/login", icon: <FiLogIn />, text: "Iniciar sesión" },
          { to: "/register", icon: <FiUserPlus />, text: "Registro" },
        ]),
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
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                {...item}
                active={activeItem === item.to || activeItem === "menu"}
              />
            ))}
            {token && user && (
              <div className="relative flex items-center space-x-2">
                <img
                  src={user.profileImage}
                  alt="Perfil"
                  className="h-10 w-10 rounded-full"
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-44 w-48 bg-white shadow-lg rounded-lg"
                    >
                      <ul className="py-1">
                        <li
                          className="px-4 py-2 hover:bg-[#f0f4f8] cursor-pointer transition-colors duration-200"
                          onClick={() => navigate("/profile")}
                        >
                          Mi perfil
                        </li>
                        {user.role === "OWNER" && (
                          <li
                            className="px-4 py-2 hover:bg-[#f0f4f8] cursor-pointer transition-colors duration-200"
                            onClick={() => navigate("/create")}
                          >
                            Mis lugares
                          </li>
                        )}
                        <li
                          className="px-4 py-2 hover:bg-[#f0f4f8] cursor-pointer transition-colors duration-200"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick?: () => void;
}> = ({ to, icon, text, active, onClick }) => (
  <Link to={to} className="relative group px-3 py-2" onClick={onClick}>
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

export default Navbar;
