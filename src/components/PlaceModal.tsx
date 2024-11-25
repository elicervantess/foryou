import React, { useState } from "react";
import { createPlace, updatePlace, ApiPlaceResponse } from "../api";
import MapComponent from "./MapComponent";

interface PlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  place: ApiPlaceResponse | null;
}

const PlaceModal: React.FC<PlaceModalProps> = ({ isOpen, onClose, place }) => {
  const [formData, setFormData] = useState({
    name: place?.name || "",
    address: place?.address || "",
    description: place?.description || "",
    category: place?.category || "",
    openingHours: place?.openingHours || "",
    latitude: place?.coordinate.latitude || "",
    longitude: place?.coordinate.longitude || "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken") || "";
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        data.append(key, value as string | Blob);
      }
    });

    try {
      if (place) {
        await updatePlace(Number(place.id), data, token);
      } else {
        await createPlace(data, token);
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar el lugar:", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {place ? "Editar Lugar" : "Crear Lugar"}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Dirección"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
          )}
          <input
            type="text"
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Selecciona una categoría</option>
            <option value="CAFETERIA">CAFETERIA</option>
            <option value="RESTAURANT">RESTAURANT</option>
            <option value="CULTURAL">CULTURAL</option>
            <option value="RECREATIONAL">RECREATIONAL</option>
            <option value="EVENT">EVENT</option>
          </select>
          <input
            type="time"
            placeholder="Horario de Apertura"
            value={formData.openingHours}
            onChange={(e) =>
              setFormData({ ...formData, openingHours: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <div className="h-64">
            <MapComponent
              places={[
                {
                  id: "1",
                  name: formData.name,
                  coordinate: {
                    latitude: Number(formData.latitude),
                    longitude: Number(formData.longitude),
                  },
                },
              ]}
              center={{
                latitude: Number(formData.latitude) || 51.505,
                longitude: Number(formData.longitude) || -0.09,
              }}
              containerStyle={{ width: "100%", height: "100%" }}
              mapId="your-map-id"
              onMapClick={(lat, lng) => {
                setFormData({ ...formData, latitude: lat, longitude: lng });
              }}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            onClick={handleSubmit}
          >
            Guardar
          </button>
          <button className="text-gray-500 hover:underline" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default PlaceModal;
