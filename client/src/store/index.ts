import { IUser } from '../shared/interfaces/IUser';
import { makeAutoObservable } from 'mobx';
import { default as authService } from '../shared/services/authService';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../shared/services/apiService';
import { IAuthResponse } from '../shared/interfaces/IAuthResponse';

class Store {
  user = {} as IUser;
  isAuthorized = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuthorized = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message);
      } else {
        console.log('Unexpected error');
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await authService.registration(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message);
      } else {
        console.log('Unexpected error');
      }
    }
  }

  async logout() {
    try {
      await authService.logout();
      localStorage.removeItem('accessToken');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message);
      } else {
        console.log('Unexpected error');
      }
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });
      console.log(response);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data?.message);
      } else {
        console.log('Unexpected error');
      }
    } finally {
      this.setLoading(false);
    }
  }
}

export default Store;
