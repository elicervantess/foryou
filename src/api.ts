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

export interface Review {
  id: number;
  comment: string;
  rating: number;
  placeId: number | null;
  placeName: string | null;
}

export interface Promotion {
  id: number;
  description: string;
  discount: number;
  startDate: string;
  endDate: string;
  placeName: string | null;
  imageUrl: string | null;
}

export interface ApiPlaceResponse {
  id: string;
  name: string;
  imageUrl: string | null;
  address: string;
  description: string;
  likes: number | null;
  category: string;
  openingHours: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  reviews: Review[];
  promotions: Promotion[];
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
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Función para registrarse
export const register = async (
  email: string,
  name: string,
  password: string,
  hasPlace: boolean
): Promise<RegisterResponse> => {
  try {
    const role = hasPlace ? 'OWNER' : 'USER';
    const response = await axios.post<RegisterResponse>(`${API_URL}/auth/signin`, {
      email,
      name,
      password,
      role,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al registrarse:", error);
    throw error;
  }
};

// Función para iniciar sesión con Google
export const loginWithGoogle = async (token: string): Promise<GoogleLoginResponse> => {
  try {
    const response = await axios.post<GoogleLoginResponse>(`${API_URL}/auth/google`, { token });
    return response.data;
  } catch (error: any) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

export async function getAllPlacesForMap(): Promise<ApiPlaceResponse[]> {
  try {
    const response = await axios.get<ApiPlaceResponse[]>(`${API_URL}/map/places`);
    console.log("Todos los lugares:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener todos los lugares:", error);
    throw error;
  }
}

export async function getPlaceById(id: string): Promise<ApiPlaceResponse> {
  try {
    const response = await axios.get<ApiPlaceResponse>(`${API_URL}/places/${id}`);
    console.log(`Lugar con ID ${id}:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error al obtener el lugar con ID ${id}:`, error);
    throw error;
  }
}

export async function getPlaceByName(name: string): Promise<ApiPlaceResponse> {
  try {
    const response = await axios.get<ApiPlaceResponse>(`${API_URL}/places/name/${name}`);
    console.log(`Lugar con nombre ${name}:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`Error al obtener el lugar con nombre ${name}:`, error);
    throw error;
  }
}

// Función para obtener lugares cercanos (ejemplo)
export const getNearbyPlaces = async (latitude: number, longitude: number): Promise<ApiPlaceResponse[]> => {
  try {
    const response = await axios.get<ApiPlaceResponse[]>(`${API_URL}/places/nearby`, {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener lugares cercanos:", error);
    throw error;
  }
};