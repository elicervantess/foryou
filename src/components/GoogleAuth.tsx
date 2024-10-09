import '../styles/App.css';
import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const clientID = '673871409745-bh4iec9sd4f6rl5fa8vshguko8t59bph.apps.googleusercontent.com';

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<any>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const onSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      const idToken = response.tokenId;
      console.log('ID Token:', idToken);

      try {
        const res = await fetch('http://localhost:8080/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: idToken }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log('Backend response:', data);

          if (data.valid) {
            setUser(response.profileObj);
            setLoggedIn(true);
            navigate('/home');
          } else {
            console.log('Token inválido');
          }
        } else {
          console.log('Error al validar con el backend');
        }
      } catch (error) {
        console.log('Error en la solicitud al backend:', error);
      }
    }
  };

  const onFailure = (response: any) => {
    console.log('Algo salió mal al iniciar sesión con Google:', response);
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
    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="center">
      {!loggedIn && (
        <div className="btn">
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Iniciar sesión con Google"
            cookiePolicy="single_host_origin"
          />
        </div>
      )}

      {loggedIn && (
        <div className="profile">
          <img src={user.imageUrl} alt="Profile" />
          <h3>{user.name}</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
