/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { ACCESS_TOKEN, API_BASE_URL, API_POKE_API_URL } from '../constants';

class XHR {
  request(options: any) {
    const regex = new RegExp(API_BASE_URL, 'g');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: '',
    };

    if (localStorage.getItem(ACCESS_TOKEN) && options.url.match(regex) !== null) {
      headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    if (options.type === 'string') {
      return axios(options.url, options).catch((err) => err);
    }

    return axios(options.url, options).then((response: any) => {
      if (response.status < 200 && response.status >= 300) {
        return Promise.reject(response.data);
      }
      return response.data;
    });
  }

  getPokeApiJson(url: string, type = 'json') {
    return this.request({
      url: API_POKE_API_URL + url,
      method: 'GET',
      type,
    });
  }

  getJson(url: string, type = 'json') {
    return this.request({
      url: API_BASE_URL + url,
      method: 'GET',
      type,
    });
  }

  getString(url: string, type = 'string') {
    return this.request({
      url: API_BASE_URL + url,
      method: 'GET',
      type,
    });
  }

  postJson(url: string, requestData: any, type = 'json') {
    return this.request({
      url: API_BASE_URL + url,
      method: 'POST',
      data: requestData,
      type,
    });
  }

  delete(url: string, type = 'json') {
    return this.request({
      url: API_BASE_URL + url,
      method: 'DELETE',
      type,
    });
  }
}

export const xhr = new XHR();
