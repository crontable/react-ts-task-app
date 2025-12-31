import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, LOCALSTORAGE_KEYS } from '../Constant';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const hasNotRetried = !originalRequest._retry;

    if (isUnauthorized && hasNotRetried) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.REFRESH}`, { refreshToken });

        localStorage.setItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);

        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch {
        localStorage.removeItem(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(LOCALSTORAGE_KEYS.REFRESH_TOKEN);

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
