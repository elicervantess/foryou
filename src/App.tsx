import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import PlacePage from "./pages/PlacePage";
import UserData from "./pages/UserData";
import { AuthProvider } from "./AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LoadScript googleMapsApiKey="AIzaSyDTW5hhttoJGo7usEohzDPfub_KR6KFTRU">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/userdata" element={<UserData />} />
          </Routes>
        </Router>
      </LoadScript>
    </AuthProvider>
  );
};

export default App;
