import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientID =
  "673871409745-bh4iec9sd4f6rl5fa8vshguko8t59bph.apps.googleusercontent.com";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSuccess = async (response: any) => {
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
        const errorData = await res.json();
        console.log("Error al validar con el backend:", errorData);
      }
    } catch (error) {
      console.error("Error en la solicitud al backend:", error);
    }
  };

  const onFailure = (response: any) => {
    if (response.error === "popup_closed_by_user") {
      console.log("El usuario cerró el popup de inicio de sesión.");
    } else {
      console.log("Algo salió mal al iniciar sesión con Google:", response);
    }
  };

  const handleLogout = () => {
    setUser({});
    setLoggedIn(false);
  };

  return (
    <div className="center">
      {!loggedIn && (
        <GoogleLogin
          clientId={clientID}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="flex items-center justify-center w-full bg-white border border-gray-300 rounded p-2 mt-4 transition-transform transform hover:scale-105"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              <span className="text-gray-700">Sign in with Google</span>
            </button>
          )}
        />
      )}

      {loggedIn && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="bg-red-600 text-white p-2 rounded mt-4 transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
