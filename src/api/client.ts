import axios from 'axios';
import { API_BASE_URL } from '../Constant';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: refresh token logic 처리

    return Promise.reject(error);
  }
);
