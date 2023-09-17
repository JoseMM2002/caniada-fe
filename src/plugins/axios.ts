import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Reemplaza esto con tu URL base
  withCredentials: false, // Opciones adicionales si es necesario
});

// Interceptor de solicitud
instance.interceptors.request.use(
  function (config) {
    // Realiza acciones antes de enviar la solicitud
    return config;
  },
  function (error) {
    // Maneja errores de solicitud
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
instance.interceptors.response.use(
  function (response) {
    // Realiza acciones con la respuesta
    return response;
  },
  function (error) {
    // Maneja errores de respuesta
    return Promise.reject(error);
  }
);

export const AxiosPlugin = {
  install: (app: any) => {
    app.config.globalProperties.$axios = instance;
  },
};