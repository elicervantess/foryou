import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./AuthContext"; // Asegúrate de que la ruta sea correcta

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

export interface ApiPlaceResponse {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  openingHours: string;
  imageUrl?: string;
  likes: number;
  reviews: Array<{ rating: number; comment: string }>;
  promotions: Array<{ id: number; title: string; discount: number }>;
  coordinate: { lat: number; lng: number };
  userHasLiked?: boolean; // Añadir esta línea
}
