import $api from './apiService';
import { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/IUser';

const userService = () => {
  const fetchUsers = (): Promise<AxiosResponse<IUser[]>> => {
    return $api.get<IUser[]>('/users');
  };

  return {
    fetchUsers
  };
};

export default userService();
