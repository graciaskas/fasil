import axios from "axios";

const axiosClient = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.request.use((config) => {
   const token = localStorage.getItem("fasilUser");
   config.headers.Authorization = `Bearer ${token}`;
   return config;
});

axiosClient.interceptors.response.use(
   (response) => {
      if (response.status === 400 || response.status === 403) {
         localStorage.clear();
         return;
      }
      return response;
   },
   (error) => {
      throw error;
   }
);

export default axiosClient;
