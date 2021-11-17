/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN } from '../constants';
import { xhr } from '../XHR';

class AuthAdapter {
  useLocalStorage: boolean;
  token: string | null | undefined;
  constructor() {
    this.useLocalStorage = typeof localStorage !== 'undefined';

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(ACCESS_TOKEN);

      if (this.token) {
        this.isTokenValid().then((bool: boolean) => {
          if (!bool) {
            this.token = null;
          }
        });
      }
    }
  }

  isLoggedIn() {
    return this.token && localStorage.getItem(ACCESS_TOKEN);
  }

  setToken(token: string) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(ACCESS_TOKEN);
    }
  }

  isTokenValid() {
    return xhr.getJson('/auth/check_token?token=' + this.token).then((json) => json.valid);
  }

  login(loginRequest: any) {
    return xhr.postJson('/auth/login', loginRequest).then((json) => {
      json && this.setToken(json.accessToken);
      return json;
    });
  }

  logout() {
    return this.removeToken();
  }

  register(registerRequest: any) {
    return xhr.postJson('/auth/register', registerRequest);
  }
}

export const auth = new AuthAdapter();
