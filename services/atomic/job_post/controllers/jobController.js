const supabase = require('../supabaseClient');

const createJob = async (req, res) => {
  const { eventID, userID, clientID, freelancerID, eventType, eventWage, eventStatus, eventStartDate, eventDueDate } = req.body;

  if (!eventID || !userID || !clientID || !eventType || !eventWage || !eventStartDate || !eventDueDate) {
    return res.status(400).json({ error: 'eventID, userID, clientID, eventType, eventWage, eventStartDate and eventDueDate are required' });
  }

  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      EventID: eventID,
      UserID: userID,
      ClientID: clientID,
      FreelancerID: freelancerID || null,
      EventType: eventType,
      EventWage: eventWage,
      EventStatus: eventStatus || 'Created',
      EventStartDate: eventStartDate,
      EventDueDate: eventDueDate
    }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json(data[0]);
};

const getJob = async (req, res) => {
  const { eventID } = req.params;

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('EventID', eventID)
    .single();

  if (error) return res.status(404).json({ error: 'Job not found' });
  return res.status(200).json(data);
};

const listJobs = async (req, res) => {
  const { status } = req.query;

  let query = supabase.from('jobs').select('*');

  if (status) {
    query = query.eq('EventStatus', status);
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
};

module.exports = { createJob, getJob, listJobs };