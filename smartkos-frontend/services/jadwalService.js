// services/jadwalService.js
import api from '@/lib/axios';

export const jadwalService = {
  // Get all bookings
  getAll: async (params = {}) => {
    const response = await api.get('/admin/jadwal', { params });
    return response.data;
  },

  // Get single booking
  getById: async (id) => {
    const response = await api.get(`/admin/jadwal/${id}`);
    return response.data;
  },

  // Create booking
  create: async (jadwalData) => {
    const response = await api.post('/admin/jadwal', jadwalData);
    return response.data;
  },

  // Update booking
  update: async (id, jadwalData) => {
    const response = await api.put(`/admin/jadwal/${id}`, jadwalData);
    return response.data;
  },

  // Checkout booking
  checkout: async (id) => {
    const response = await api.post(`/admin/jadwal/${id}/checkout`);
    return response.data;
  },

  // Cancel booking
  cancel: async (id, alasan) => {
    const response = await api.post(`/admin/jadwal/${id}/cancel`, { alasan });
    return response.data;
  }
};