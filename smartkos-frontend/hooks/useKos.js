// hooks/useKos.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { kosService } from '@/services/kosService';

export const useKos = () => {
  const queryClient = useQueryClient();

  // Get all kos
  const useGetAllKos = (params = {}) => {
    return useQuery({
      queryKey: ['kos', params],
      queryFn: () => kosService.getAll(params),
    });
  };

  // Get single kos
  const useGetKos = (id) => {
    return useQuery({
      queryKey: ['kos', id],
      queryFn: () => kosService.getById(id),
      enabled: !!id,
    });
  };

  // Create kos
  const useCreateKos = () => {
    return useMutation({
      mutationFn: kosService.create,
      onSuccess: () => {
        queryClient.invalidateQueries(['kos']);
      },
    });
  };

  // Update kos
  const useUpdateKos = () => {
    return useMutation({
      mutationFn: ({ id, data }) => kosService.update(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['kos']);
        queryClient.invalidateQueries(['kos', variables.id]);
      },
    });
  };

  // Delete kos
  const useDeleteKos = () => {
    return useMutation({
      mutationFn: kosService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries(['kos']);
      },
    });
  };

  return {
    useGetAllKos,
    useGetKos,
    useCreateKos,
    useUpdateKos,
    useDeleteKos,
  };
};