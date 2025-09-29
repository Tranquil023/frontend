import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    full_name?: string;
    phone: string;
  };
}

export interface RegisterData {
  full_name: string;
  phone: string;
  password: string;
  withdrawal_password: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/users/login`, data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/users/register`, data);
    return response.data;
  }
};

export default authApi;