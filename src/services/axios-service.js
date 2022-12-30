import axios from "axios";

export class AxiosService {
  constructor() {
    const defaultUrl = "http://localhost:8000/api/v1";

    this.client = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
    });

    this.client.interceptors.response.use(
      function (response) {
        if (response.status !== 200) {
          throw response.data;
        }
        return response.data;
      },
      function (error) {
        return {
          isError: true,
          ...error.response,
        };
      }
    );
  }

  setToken(token) {
    this.client.defaults.headers.authorization = `Bearer ${token}`;
  }

  revokeToken() {
    this.client.defaults.headers.authorization = undefined;
  }
}

export const axiosService = new AxiosService();
