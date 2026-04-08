import { useMutation } from '@tanstack/react-query';
import { joinWaitlist } from '../services/waitlistService';

export const useJoinWaitlist = () => {
  return useMutation({
    mutationFn: joinWaitlist,
  });
};
