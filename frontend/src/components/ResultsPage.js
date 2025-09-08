// src/components/ResultsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResultsPage.css';

function ResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch results from the backend
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="results-container">
      <h2>Voting Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.candidate}</td>
              <td>{result.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsPage;
