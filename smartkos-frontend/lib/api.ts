// frontend/lib/api.js
import axios from 'axios';

// Buat instance axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Penting untuk Sanctum
});

// Interceptor untuk request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Jika error 401 (Unauthorized) dan belum pernah retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Coba refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
            { refresh_token: refreshToken },
            { withCredentials: true }
          );
          
          if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Jika refresh gagal, logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        // Redirect ke login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
    
    // Untuk error selain 401
    return Promise.reject(error);
  }
);

export default api;