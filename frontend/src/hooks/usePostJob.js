import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postJob } from '../services/jobsService';

export const usePostJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
};
