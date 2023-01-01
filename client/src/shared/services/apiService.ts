import axios from 'axios';
import { IAuthResponse } from '../interfaces/IAuthResponse';

export const API_URL = `https://nodeauth-server.onrender.com/api`;

const $api = axios.create({
  withCredentials: true, // automatically add cookies for queries
  baseURL: API_URL
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('Unauthorized error');
      }
    }
    throw error;
  }
);

export default $api;
