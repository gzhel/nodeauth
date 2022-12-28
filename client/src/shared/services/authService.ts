import $api from './apiService';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../interfaces/IAuthResponse';

const authService: Function = () => {
  const login = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
    return $api.post<IAuthResponse>('/login', { email, password });
  };

  const registration = async (
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> => {
    return $api.post<IAuthResponse>('/registration', { email, password });
  };

  const logout = async (): Promise<void> => {
    return $api.post('/logout');
  };

  return {
    login,
    registration,
    logout
  };
};

export default authService();
