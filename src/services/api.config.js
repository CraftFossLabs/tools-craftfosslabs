import axios from 'axios';

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
    ResetPassword: email => api.post('/auth/forgot-password', { email }),
    verifyEmail: (token, email) => api.get(`/auth/verify-email/${token}?email=${email}`),
    setNewPassword: (resetToken, password, confirmPassword) =>
      api.put(`/auth/reset-password/${resetToken}`, { password, confirmPassword }),
  },
  financePlanner: {},
  VsCode: {},
};

export { endpoints, api };
