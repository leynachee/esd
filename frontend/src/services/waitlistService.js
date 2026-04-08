import { waitlistManagerApi, acceptGigApi } from './api';

// Join the waitlist for an event
// Expects: { EventID, FreelancerID }
export const joinWaitlist = async (payload) => {
  const res = await waitlistManagerApi.post('/join-waitlist', payload);
  return res.data;
};

// Accept a freelancer for a gig (triggers payment + notification)
// Expects: { UserID, EventID, WaitlistID }
export const acceptFreelancer = async (payload) => {
  const res = await acceptGigApi.post('/accept-freelancer', payload);
  return res.data;
};

// Get all waitlist entries for a given event
export const getWaitlistEntries = async (eventId) => {
  const res = await waitlistManagerApi.get(`/waitlist-entries/${eventId}`);
  return res.data;
};
