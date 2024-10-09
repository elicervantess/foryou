import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Interfaces para los tipos de datos de respuesta
interface LoginResponse {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

interface RegisterResponse {
  message: string;
}

interface GoogleLoginResponse {
  valid: boolean;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

// Función para iniciar sesión
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

// Función para registrarse
export const register = async (
  email: string,
  name: string,
  password: string,
  hasPlace: boolean
): Promise<RegisterResponse> => {
  const role = hasPlace ? 'OWNER' : 'USER';
  const response = await axios.post<RegisterResponse>(`${API_URL}/auth/signin`, {
    email,
    name,
    password,
    role,
  });
  return response.data;
};

// Función para iniciar sesión con Google
export const loginWithGoogle = async (token: string): Promise<GoogleLoginResponse> => {
  const response = await axios.post<GoogleLoginResponse>(`${API_URL}/auth/google`, { token });
  return response.data;
};
