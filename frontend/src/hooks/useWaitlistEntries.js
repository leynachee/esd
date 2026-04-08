import { useQuery } from '@tanstack/react-query';
import { getWaitlistEntries } from '../services/waitlistService';

export const useWaitlistEntries = (eventId) => {
  return useQuery({
    queryKey: ['waitlist', eventId],
    queryFn: () => getWaitlistEntries(eventId),
    enabled: !!eventId,
  });
};
