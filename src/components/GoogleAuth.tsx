import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const clientID =
  "673871409745-bh4iec9sd4f6rl5fa8vshguko8t59bph.apps.googleusercontent.com";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSuccess = async (response: any) => {
    if ("tokenId" in response) {
      const idToken = response.tokenId;
      console.log("ID Token:", idToken);

      try {
        const res = await fetch("http://localhost:8080/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: idToken }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Backend response:", data);

          if (data.valid) {
            setUser(response.profileObj);
            setLoggedIn(true);
            navigate("/home");
          } else {
            console.log("Token inválido");
          }
        } else {
          console.log("Error al validar con el backend");
        }
      } catch (error) {
        console.log("Error en la solicitud al backend:", error);
      }
    }
  };

  const onFailure = () => {
    console.log("Algo salió mal al iniciar sesión con Google");
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="center">
        {!loggedIn && <GoogleLogin onSuccess={onSuccess} onError={onFailure} />}

        {loggedIn && (
          <div className="profile mt-4">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-center text-gray-800 mt-2">{user.name}</h3>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white p-2 rounded-xl mt-4 transition-transform transform hover:scale-105 hover:bg-red-700 shadow-md"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
