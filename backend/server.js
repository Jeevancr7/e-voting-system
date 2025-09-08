// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import auth from './middleware/auth.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/votingdb';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Vote Schema and Model
const voteSchema = new mongoose.Schema({
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidate: { type: String, required: true },
});
const Vote = mongoose.model('Vote', voteSchema);

// User Registration Route
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// User Login Route
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Cast Vote Route (Protected)
app.post('/api/vote', auth, async (req, res) => {
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

// Retrieve Voting Results Route
app.get('/api/results', async (req, res) => {
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

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
