import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartsafeschoolback.tadi.uz/api',
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
          const response = await axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
            'refresh': refreshToken
          });
          const { token } = response.data.access;
  
          localStorage.setItem('token', token);
  
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
          console.log(error);
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api;
