const supabase = require('../supabaseClient');

const jobCreated = async (req, res) => {
  const { userID, eventID, message } = req.body;

  if (!userID || !eventID) {
    return res.status(400).json({ error: 'userID and eventID are required' });
  }

  const { data, error } = await supabase
    .from('notifications')
    .insert([{
      UserID: userID,
      EventID: eventID,
      Message: message || 'Your job post has been created successfully!',
      Type: 'job-created',
      IsRead: false,
      CreatedAt: new Date().toISOString()
    }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ success: true, notification: data[0] });
};

const waitlistJoined = async (req, res) => {
  const { userID, eventID, message } = req.body;

  if (!userID || !eventID) {
    return res.status(400).json({ error: 'userID and eventID are required' });
  }

  const { data, error } = await supabase
    .from('notifications')
    .insert([{
      UserID: userID,
      EventID: eventID,
      Message: message || 'You have been successfully added to the waitlist!',
      Type: 'waitlist-joined',
      IsRead: false,
      CreatedAt: new Date().toISOString()
    }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ success: true, notification: data[0] });
};

const jobAccepted = async (req, res) => {
  const { userID, eventID, message } = req.body;

  if (!userID || !eventID) {
    return res.status(400).json({ error: 'userID and eventID are required' });
  }

  const { data, error } = await supabase
    .from('notifications')
    .insert([{
      UserID: userID,
      EventID: eventID,
      Message: message || 'Congratulations! You have been accepted for the job!',
      Type: 'job-accepted',
      IsRead: false,
      CreatedAt: new Date().toISOString()
    }])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(201).json({ success: true, notification: data[0] });
};

module.exports = { jobCreated, waitlistJoined, jobAccepted };