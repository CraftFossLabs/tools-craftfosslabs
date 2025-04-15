import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

const endpoints = {
  auth: {
    register: data => api.post('/auth/register', data),
    login: data => api.post('/auth/login', data),
    ResetPassword: data => api.post('/auth/reset-password', data),
  },
  financePlanner: {},
  VsCode: {},
};

export { endpoints, api };
