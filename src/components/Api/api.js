import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartsafeschoolback.tadi.uz/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
          'refresh': refreshToken
        });
        const { token } = response.data.access;

        localStorage.setItem('token', token);

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest); // api ni o'zgartirdik

      } catch (error) {
        localStorage.clear()
		window.location.reload()
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

setInterval(async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('https://smartsafeschoolback.tadi.uz/api/users/token/refresh/', {
      'refresh': refreshToken
    });
    const token = response.data.access;
    console.log(token);
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  } catch (error) {
    localStorage.clear()
		window.location.reload()
    console.log(error);
  }
},  15 * 59000); // Har bir 59 sekundda bir marta tokenlarni yangilash

export default api;
