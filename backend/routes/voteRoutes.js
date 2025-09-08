// routes/voteRoutes.js
import express from 'express';
import Vote from '../models/Vote.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST route to cast vote (protected by auth middleware)
router.post('/api/vote', auth, async (req, res) => {
    const { candidate } = req.body;
    const voterId = req.user.id;

    try {
        const existingVote = await Vote.findOne({ voterId });
        if (existingVote) {
            return res.status(400).json({ error: 'You have already cast your vote' });
        }

        const newVote = new Vote({ voterId, candidate });
        await newVote.save();
        res.status(201).json({ message: 'Vote cast successfully' });
    } catch (error) {
        console.error('Error casting vote:', error.message);
        res.status(500).json({ error: 'Failed to cast vote' });
    }
});

// GET route to retrieve voting results
router.get('/api/results', async (req, res) => {
    try {
        const results = await Vote.aggregate([
            { $group: { _id: '$candidate', votes: { $sum: 1 } } },
            { $project: { candidate: '$_id', votes: 1, _id: 0 } }
        ]);
        res.json(results);
    } catch (error) {
        console.error('Error fetching results:', error.message);
        res.status(500).json({ error: 'Failed to calculate results' });
    }
});

export default router;
