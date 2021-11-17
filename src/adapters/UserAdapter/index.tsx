import { xhr } from '../XHR';
import { auth } from '../AuthAdapter';
class UserAdapter {
  getCurrentUser() {
    if (auth.isLoggedIn()) return xhr.getJson('/user/me');
    return Promise.reject('No access token set!');
  }
}

export const user = new UserAdapter();
