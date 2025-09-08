// src/components/VotingPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './VotingPage.css'; // Import the CSS file

function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [message, setMessage] = useState('');

  const handleVote = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to cast your vote');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/vote',
        { candidate: selectedCandidate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message || 'Vote cast successfully');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to cast vote');
    }
  };

  return (
    <div className="voting-container">
      <h2>Voting Page</h2>
      <div className="voting-content">
        <label htmlFor="candidate-select" className="label">Select a Candidate</label>
        <select
          id="candidate-select"
          onChange={(e) => setSelectedCandidate(e.target.value)}
          value={selectedCandidate}
          className="candidate-select"
        >
          <option value="">Choose</option>
          <option value="Candidate A">Candidate A</option>
          <option value="Candidate B">Candidate B</option>
          <option value="Candidate C">Candidate C</option>
        </select>
        <button onClick={handleVote} className="vote-button">Cast Vote</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default VotingPage;
