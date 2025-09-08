// backend/models/Vote.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Vote', voteSchema);
