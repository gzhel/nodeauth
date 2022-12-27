import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../http';
import { AuthResponse } from '../models/response/AuthResponse';

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
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
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
      console.log(email, password);
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
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
      await AuthService.logout();
      localStorage.removeItem('token');
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
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
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
