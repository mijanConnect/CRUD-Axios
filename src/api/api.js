import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const token = "AA-55-hgdfhj";

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Error come from server
      error.message = `Error from server: status: ${error.response.status} - message: ${error.response.statusText}`;
    }
    return Promise.reject(error);
  }
);
export default api;
