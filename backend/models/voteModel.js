// models/voteModel.js
import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    voterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    candidate: { type: String, required: true },
});

const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema);  // Prevent overwriting

export default Vote;
