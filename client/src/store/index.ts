import { IUser } from '../shared/interfaces/IUser';
import { makeAutoObservable } from 'mobx';
import { default as authService } from '../shared/services/authService';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../shared/services/apiService';
import { IAuthResponse } from '../shared/interfaces/IAuthResponse';
import { IValidationError } from '../shared/interfaces/IValidationError';

class Store {
  user = {} as IUser;
  isAuthorized = false;
  isLoading = false;
  errors = [] as IValidationError[];
  validationMessage = '';

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

  setErrors(errors: IValidationError[]) {
    this.errors = errors;
  }

  setValidationMessage(message: string) {
    this.validationMessage = message;
  }

  async login(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.errors.length) {
          this.setErrors(e.response?.data?.errors);
        } else {
          this.setValidationMessage(e.response?.data?.message);
        }
      } else {
        this.setValidationMessage('Unexpected error');
      }
    }
    this.setLoading(false);
  }

  async registration(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await authService.registration(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.errors.length) {
          this.setErrors(e.response?.data?.errors);
        } else {
          this.setValidationMessage(e.response?.data?.message);
        }
      } else {
        this.setValidationMessage('Unexpected error');
      }
    }
    this.setLoading(false);
  }

  async logout() {
    this.setLoading(true);
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
    this.setLoading(false);
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      console.log('src/store/index.ts - checkAuth - 1');
      const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });
      console.log('src/store/index.ts - checkAuth - 2', response);
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
