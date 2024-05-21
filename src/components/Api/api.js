import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.53:8585/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      const refreshToken = localStorage.getItem("refreshToken");
      axios
        .post("http://192.168.100.53:8585/api/users/token/refresh/", {
          refresh: refreshToken,
        })
        .then((result) => {
          const { token } = result.data.access;

          localStorage.setItem("token", token);

          config.headers.Authorization = `Bearer ${token}`;
        })
        .catch((error) => {
          localStorage.clear();
          window.location.reload();
          console.log(error);
        });
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      axios
        .post("http://192.168.100.53:8585/api/users/token/refresh/", {
          refresh: refreshToken,
        })
        .then((result) => {
          const { token } = result.data.access;

          localStorage.setItem("token", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest); // api ni o'zgartirdik
        })
        .catch((error) => {
          localStorage.clear();
          window.location.reload();
          console.log(error);
        });
    }

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const token = localStorage.getItem( 'token');
//     const originalRequest = error.config;
//     if (token === undefined) {
//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = axios.post('http://192.168.100.53:8585/api/users/token/refresh/', {
//           'refresh': refreshToken
//         });
//         const { token } = response.data.access;

//         localStorage.setItem('token', token);

//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return api(originalRequest);

//       } catch (error) {
//         localStorage.clear()
// 		window.location.reload()
//         console.log(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
