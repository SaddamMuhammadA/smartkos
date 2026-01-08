// services/kamarService.js
import api from '@/lib/axios';

export const kamarService = {
  // Get all rooms (admin)
  getAll: async (params = {}) => {
    const response = await api.get('/admin/kamar', { params });
    return response.data;
  },

  // Get rooms by kos (admin)
  getByKos: async (id_kos) => {
    const response = await api.get(`/admin/kamar/kos/${id_kos}`);
    return response.data;
  },

  // Get single room
  getById: async (id) => {
    const response = await api.get(`/admin/kamar/${id}`);
    return response.data;
  },

  // Create room
  create: async (kamarData) => {
    const response = await api.post('/admin/kamar', kamarData);
    return response.data;
  },

  // Update room
  update: async (id, kamarData) => {
    const response = await api.put(`/admin/kamar/${id}`, kamarData);
    return response.data;
  },

  // Update room status
  updateStatus: async (id, status) => {
    const response = await api.put(`/admin/kamar/${id}/status`, { status });
    return response.data;
  },

  // Delete room
  delete: async (id) => {
    const response = await api.delete(`/admin/kamar/${id}`);
    return response.data;
  }
};