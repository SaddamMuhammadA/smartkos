// hooks/useDashboard.js
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useDashboardStats = (timeRange = 'month') => {
  return useQuery({
    queryKey: ['dashboard', timeRange],
    queryFn: async () => {
      const response = await api.get('/admin/dashboard/stats', {
        params: { range: timeRange }
      });
      return response.data;
    },
  });
};