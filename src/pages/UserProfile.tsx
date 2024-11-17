import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { getCurrentUser, updateProfilePhoto, UserResponse } from "../api";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import EditUser from "../components/EditUser";
import { PencilIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const { token } = useAuth();

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

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (user && token && event.target.files) {
      const file = event.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setLoading(true);
      try {
        const updatedUser = await updateProfilePhoto(user.id, file, token);
        setUser(updatedUser);
        setSuccessModalOpen(true);
      } catch (error) {
        console.error("Error al actualizar la foto de perfil:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center mt-20 p-8 bg-gradient-to-r from-[#75BCE0] to-[#78D1D2] shadow-2xl rounded-3xl max-w-lg mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        <img
          src={previewImage || user.profileImage}
          alt="Foto de perfil"
          className="h-48 w-48 rounded-full border-4 border-white shadow-lg"
        />
        <PencilIcon
          className="h-8 w-8 text-white absolute bottom-2 right-2 cursor-pointer bg-[#214D72] rounded-full p-1 hover:bg-[#78D1D2] transition"
          onClick={() =>
            (
              document.querySelector("input[type='file']") as HTMLInputElement
            ).click()
          }
        />
      </motion.div>
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
      <EditUser user={user} token={token || ""} onUpdate={setUser} />
      {loading && <ClipLoader color="#ffffff" size={50} />}

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
                <span>Imagen actualizada con éxito</span>
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
    </motion.div>
  );
};

export default UserProfile;
