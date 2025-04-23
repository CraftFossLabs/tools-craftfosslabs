import axios from 'axios';
import useUserStore from '@/store/userStore';

const api = axios.create({
  // baseURL: 'http://localhost:8000/api',
  baseURL: 'https://api.server.documentsheet.com/api',
});
api.interceptors.request.use(
  config => {
    const user = useUserStore.getState().user;
    if (user?.apiKey) {
      config.headers['x-api-key'] = user.apiKey;
    }
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
    Logout: () => api.get('/auth/logout'),
    GoogleLogin: (name, email, picture) => api.post('/auth/google', { name, email, picture }),
    contactUs: data => api.post('/auth/contact', { data }),
  },
  vsCode: {
    uploadZip: formData =>
      api.post('/tools/upload-zip', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    GetAllCodeByUser: () => api.get('/tools/getShareCodeByUser'),
    GetSingleCodeDetails: urlCode => api.get(`/tools/getShareCodeByUser/${urlCode}`),
    uploadGithub: githubUrl => api.post('/tools/upload-githubUrl', { githubUrl }),
    deleteCode: deleteId => api.delete(`/tools/deleteUrl/${deleteId}`),
  },
  FinancePLanner: {
    Overview: () => api.get('/tools/finance/overview'),
    UpdateSalary: data => api.post('/tools/finance/salary', { data }),
    AddExpense: data => api.post('/tools/finance/expense', { data }),
    AddSideIncome: data => api.post('/tools/finance/sideincome', { data }),
    Loan: data => api.post('/tools/finance/loan', { data }),
  },
};

export { endpoints, api };
