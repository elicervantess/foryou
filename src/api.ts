import axios from 'axios';

const API_URL = 'http://localhost:8080';

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
  closingHours: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  reviews: Review[];
  promotions: Promotion[];
  userHasLiked?: boolean;
}

interface GoogleLoginResponse {
  valid: boolean;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

export interface NewReviewDto {
  comment: string;
  rating: number;
  placeId: number;
}

export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  role: string;
  profileImage: string;
}

// Función para iniciar sesión
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, { email, password });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
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
): Promise<LoginResponse> => {
  try {
    const role = hasPlace ? 'OWNER' : 'USER';
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/signin`, {
      email,
      name,
      password,
      role,
    });
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
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

export async function toggleLike(id: string, token: string): Promise<ApiPlaceResponse> {
  try {
    const response = await axios.post<ApiPlaceResponse>(`${API_URL}/places/${id}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error al alternar like para el lugar con ID ${id}:`, error);
    throw error;
  }
}

export const logout = async (token: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export async function getPromotionsByPlace(placeId: string, token: string): Promise<Promotion[]> {
  try {
    const response = await axios.get<Promotion[]>(`${API_URL}/promotions/place/${placeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error al obtener promociones para el lugar con ID ${placeId}:`, error);
    throw error;
  }
}

// Interfaz para la solicitud de reserva
export interface ReservationRequest {
  placeId: number;
  date: string;
  numberOfPeople: number;
}

// Interfaz para la respuesta de reserva
export interface ReservationResponse {
  id: number;
  placeId: number;
  date: string;
  numberOfPeople: number;
  userEmail: string;
}

export async function createReservation(
  reservationRequest: ReservationRequest,
  token: string
): Promise<ReservationResponse> {
  try {
    const response = await axios.post<ReservationResponse>(
      `${API_URL}/reservations`,
      reservationRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al crear la reserva:", error);
    throw error;
  }
}

export async function createReview(newReview: NewReviewDto, token: string): Promise<void> {
  try {
    await axios.post(`${API_URL}/review/new`, newReview, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error al crear la reseña:", error);
    throw error;
  }
}

export const getCurrentUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener la información del usuario:", error);
    throw error;
  }
};

export const updateUser = async (token: string, userData: Partial<UserResponse>): Promise<UserResponse> => {
  try {
    const response = await axios.put<UserResponse>(`${API_URL}/users/edit/me`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar la información del usuario:", error);
    throw error;
  }
};

export const updateProfilePhoto = async (id: number, profilePhoto: File, token: string): Promise<UserResponse> => {
  const formData = new FormData();
  formData.append('profilePhoto', profilePhoto);

  try {
    const response = await axios.put<UserResponse>(`${API_URL}/users/${id}/profile-photo`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar la foto de perfil:", error);
    throw error;
  }
};

export interface UserReservation {
  placeId: number;
  placeName: string;
  date: string;
  numberOfPeople: number;
  imageUrl: string;
}

export const getUserReservations = async (token: string): Promise<UserReservation[]> => {
  try {
    const response = await axios.get<UserReservation[]>(`${API_URL}/reservations/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener las reservas del usuario:", error);
    throw error;
  }
};

export const createPlace = async (placeData: FormData, token: string): Promise<ApiPlaceResponse> => {
  try {
    const response = await axios.post<ApiPlaceResponse>(`${API_URL}/places`, placeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al crear el lugar:", error);
    throw error;
  }
};

export const updatePlace = async (id: number, placeData: FormData, token: string): Promise<ApiPlaceResponse> => {
  try {
    const response = await axios.put<ApiPlaceResponse>(`${API_URL}/places/${id}`, placeData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar el lugar:", error);
    throw error;
  }
};

export const deletePlace = async (id: number, token: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/places/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error("Error al eliminar el lugar:", error);
    throw error;
  }
};

export const getMyPlaces = async (token: string): Promise<ApiPlaceResponse[]> => {
  try {
    const response = await axios.get<ApiPlaceResponse[]>(`${API_URL}/places/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener mis lugares:", error);
    throw error;
  }
};

export interface ReservationSummaryDto {
  reservationId: number;
  date: string;
  numberOfPeople: number;
  placeId: number;
  placeName: string;
  userName: string;
  userEmail: string;
}

export const getReservationsByOwner = async (token: string): Promise<ReservationSummaryDto[]> => {
  try {
    const response = await axios.get<ReservationSummaryDto[]>(`${API_URL}/myplaces`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener las reservas del propietario:", error);
    throw error;
  }
};


