import config from '@/core/config';
import type { AxiosError } from 'axios';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: config.API_URL,
  timeout: 120000,
});

/**
 * Auth error handler
 */
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default httpClient;
