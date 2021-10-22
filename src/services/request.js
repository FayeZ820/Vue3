import axios from "axios";
import { save, restore } from "./cache";

axios.defaults.baseURL = `${import.meta.env.VITE_API_HOST}/api/v3`;

/**
 * Resolve response body
 */
axios.interceptors.response.use(
  (response) => {
    const { data, config } = response;
    const { method, url } = config;
    const key = `[${method}] ${url}`;

    if (data) {
      save(key, data);
    }

    return data;
  },
  (err) => {
    if (err.config) {
      const { method, url } = err.config;
      const key = `[${method}] ${url}`;

      const cache = restore(key);

      if (cache) {
        return cache;
      }
    }

    if (err.response) {
      const { data, statusText } = err.response;
      const message = data.error || data.message || statusText;

      return Promise.reject(new Error(message));
    }

    return Promise.reject(err);
  }
);

export default axios;
