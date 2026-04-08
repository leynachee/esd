import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptFreelancer } from '../services/waitlistService';

export const useAcceptFreelancer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: acceptFreelancer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
