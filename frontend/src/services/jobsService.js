import { jobPostingApi, waitlistManagerApi } from './api';

// Fetch all open jobs via Waitlist Manager orchestrator
export const getOpenJobs = async () => {
  const res = await waitlistManagerApi.get('/available-jobs');
  return res.data;
};

// Post a new job via Job Posting orchestrator
// Expects: { userID, eventType, eventWage, startDate, dueDate }
export const postJob = async (payload) => {
  const res = await jobPostingApi.post('/post-job', payload);
  return res.data;
};
