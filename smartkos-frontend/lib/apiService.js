import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  logout: async () => {
    await api.post('/logout');
    localStorage.removeItem('token');
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/user');
    return response.data;
  }
};

export const kosService = {
  getAll: async () => {
    const response = await api.get('/kos');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/kos/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/kos', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/kos/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/kos/${id}`);
  }
};

// Tambahkan service lain: kamarService, customerService, dll.