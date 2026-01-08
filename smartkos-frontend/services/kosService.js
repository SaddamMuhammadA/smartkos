// services/kosService.js
import api from '@/lib/axios';

export const kosService = {
  // Get all kos (public)
  getAll: async (params = {}) => {
    const response = await api.get('/kos', { params });
    return response.data;
  },

  // Get single kos (public)
  getById: async (id) => {
    const response = await api.get(`/kos/${id}`);
    return response.data;
  },

  // Admin: Create kos
  create: async (kosData) => {
    const response = await api.post('/admin/kos', kosData);
    return response.data;
  },

  // Admin: Update kos
  update: async (id, kosData) => {
    const response = await api.put(`/admin/kos/${id}`, kosData);
    return response.data;
  },

  // Admin: Delete kos
  delete: async (id) => {
    const response = await api.delete(`/admin/kos/${id}`);
    return response.data;
  },

  // Get available rooms
  getAvailableRooms: async (id_kos, params = {}) => {
    const response = await api.get(`/kos/${id_kos}/kamar-tersedia`, { params });
    return response.data;
  }
};