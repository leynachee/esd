import axios from 'axios';

export const jobPostingApi = axios.create({
  baseURL: import.meta.env.VITE_JOB_POSTING_URL,
});

export const waitlistManagerApi = axios.create({
  baseURL: import.meta.env.VITE_WAITLIST_MANAGER_URL,
});

export const acceptGigApi = axios.create({
  baseURL: import.meta.env.VITE_ACCEPT_GIG_URL,
});
