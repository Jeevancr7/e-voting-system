// routes/resultRoutes.js
import express from 'express';
import Vote from '../models/voteModel.js'; // Import Vote model from the models folder

const router = express.Router();

// Route to get voting results
router.get('/results', async (req, res) => {
    try {
        const results = await Vote.aggregate([
            {
                $group: {
                    _id: "$candidate",  // Group by candidate field
                    voteCount: { $sum: 1 } // Count votes per candidate
                }
            }
        ]);

        res.json(results);
    } catch (error) {
        console.error("Error fetching results:", error.message);
        res.status(500).json({ error: "Failed to fetch results" });
    }
});

export default router;
