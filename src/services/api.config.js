import axios from 'axios';
import useUserStore from '@/store/userStore';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  // baseURL: 'https://api.server.documentsheet.com/api',
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
  PersonalManager:{
    fetchTasks : () =>api.get('/tools/task-manager/tasks'),
    addTask : (task) => api.post('/tools/task-manager/tasks',task),
    updateTask : ({_id,task}) => api.put(`/tools/task-manager/tasks/${_id}`, {task}),
    deleteTask : (_id) =>api.delete(`/tools/task-manager/tasks/${_id}`)
  },
  emailFinder: {
    findEmail: (text) => api.post(`/tools/extract-emails`, { text }),
    findMobile: (text) => api.post(`/tools/extract-phone-numbers`, { text }),
    findLink: (text) => api.post(`/tools/extract-links`, { text }),
  },
  tracking: {
    getTrackingStatus: () => api.get(`/tools/track-device`),
  },
  urlShortener: {
    shortenURL: (url) => api.post('/tools/shorten', { url }),
  },
  maps: {
    getLocation: (address) => api.get(`/tools/search-address?query=${address}`),
  },
  qrCode: {
    generateQR: (data) =>
      api.get('/tools/generate-qr', {
        params: {
          text: data.text,
          size: data.size,
          color: data.color,
          backgroundColor: data.backgroundColor,
        },
      }),
  },
  profilePicture: {
    generateAvatar: (data) =>
      api.get(`/tools/generate-avatar`, {
        params: { name: data.name, color: data.color },
      }),
    generateAvatarByGender: (gender) =>
      api.get(`/tools/get-avatar-by-gender?gender=${gender}`),
  },
  fileConverter: {
    convertFile: (formData) =>
      api.post('/tools/convert-file', formData, {
        headers: {
          'Content-Type': undefined,
        },
      }),
  },
};

export { endpoints, api };
