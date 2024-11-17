import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";
import { updateUser, UserResponse } from "../api";

interface EditUserProps {
  user: UserResponse;
  token: string;
  onUpdate: (updatedUser: UserResponse) => void;
}

const EditUser: React.FC<EditUserProps> = ({ user, token, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editField, setEditField] = useState<"fullName" | "role" | null>(null);
  const [editValue, setEditValue] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleEdit = async (field: "fullName" | "role", value: string) => {
    if (user && token) {
      try {
        const updatedUser = await updateUser(token, {
          fullName: field === "fullName" ? value : user.fullName,
          role: field === "role" ? value : user.role,
        });
        onUpdate(updatedUser);
        setMessage({
          type: "success",
          text:
            field === "fullName"
              ? "Nombre actualizado con éxito"
              : "Role actualizado con éxito",
        });
        setSuccessModalOpen(true);
      } catch (error) {
        console.error("Error al actualizar la información del usuario:", error);
      }
    }
  };

  const openModal = (field: "fullName" | "role", currentValue: string) => {
    setEditField(field);
    setEditValue(currentValue);
    setIsOpen(true);
    setModalError(null);
  };

  const handleSave = async () => {
    if (editField === "fullName" && editValue.trim() === "") {
      setModalError("El nombre no puede estar vacío");
      return;
    }
    try {
      if (editField && editValue) {
        await handleEdit(editField, editValue);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar los datos" });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-[#214D72]">Correo:</span>
          <span className="text-xl text-[#214D72]">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-[#214D72]">Nombre:</span>
          <span className="text-xl text-[#214D72]">{user.fullName}</span>
          <PencilIcon
            className="h-6 w-6 text-[#214D72] cursor-pointer hover:text-[#78D1D2] transition"
            onClick={() => openModal("fullName", user.fullName)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-[#214D72]">Role:</span>
          <span className="text-xl text-[#214D72]">{user.role}</span>
          <PencilIcon
            className="h-6 w-6 text-[#214D72] cursor-pointer hover:text-[#78D1D2] transition"
            onClick={() => openModal("role", user.role)}
          />
        </div>
      </div>

      <Transition show={successModalOpen} as={React.Fragment}>
        <Dialog
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-[#78D1D2] p-8 rounded-3xl shadow-xl max-w-md w-full text-white">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-6 w-6" />
                <span>{message?.text}</span>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-white text-[#78D1D2] rounded-full hover:bg-gray-100 transition"
              >
                Cerrar
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="bg-white p-8 rounded-3xl shadow-xl transition-transform transform-gpu scale-95 max-w-md w-full">
              <Dialog.Title className="text-lg font-bold mb-4 flex items-center">
                <PencilIcon className="h-6 w-6 text-[#75BCE0] mr-2" />
                Editar {editField}
              </Dialog.Title>
              <div className="mb-4">
                {editField === "role" ? (
                  <select
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="mt-2 p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#75BCE0]"
                  >
                    <option value="OWNER">OWNER</option>
                    <option value="USER">USER</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="mt-2 p-3 border-2 border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#75BCE0]"
                  />
                )}
                {modalError && (
                  <div className="mt-2 text-red-500 flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 mr-1" />
                    {modalError}
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#75BCE0] text-white rounded-full hover:bg-[#78D1D2] transition"
                >
                  Guardar
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditUser;
