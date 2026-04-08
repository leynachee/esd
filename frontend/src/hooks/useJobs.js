import { useQuery } from '@tanstack/react-query';
import { getOpenJobs } from '../services/jobsService';

export const useJobs = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getOpenJobs,
  });
};
