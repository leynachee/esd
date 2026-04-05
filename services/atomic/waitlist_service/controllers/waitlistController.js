const supabase = require('../config/supabaseClient');

const addToWaitlist = async (req, res) => {
    const { EventID, UserID } = req.body;

    if (!EventID || !UserID) {
        return res.status(400).json({ message: "EventID and UserID are required." });
    }

    try {
        const { data, error } = await supabase
            .from('waitlist') 
            .insert([
                { EventID: EventID, UserID: UserID } 
            ])
            .select();

        if (error) throw error;

        res.status(201).json({ 
            message: "Successfully added to waitlist database", 
            data: data[0]
        });
    } catch (error) {
        console.error("Supabase Insert Error:", error.message);
       
        if (error.code === '23505') {
            return res.status(409).json({ message: "User is already on the waitlist for this event." });
        }
        res.status(500).json({ message: "Failed to interact with database", details: error.message });
    }
};

const getWaitlist = async (req, res) => {
    const { eventId } = req.params;

    try {
        const { data, error } = await supabase
            .from('waitlist')
            .select('UserID')
            .eq('EventID', eventId);

        if (error) throw error;

        const members = data.map(entry => entry.UserID);

        res.status(200).json({ 
            EventID: eventId, 
            Waitlist: members 
        });
    } catch (error) {
        console.error("Supabase Select Error:", error.message);
        res.status(500).json({ message: "Failed to retrieve waitlist" });
    }
};

module.exports = {
    addToWaitlist,
    getWaitlist
};