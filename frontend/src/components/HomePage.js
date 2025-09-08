// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to the E-Voting System</h1>
      <p>Your secure and easy-to-use voting platform.</p>
      <div className="home-buttons">
        <Link to="/login" className="home-button">Login</Link>
        <Link to="/register" className="home-button">Register</Link>
        <Link to="/vote" className="home-button">Vote</Link>
      </div>
    </div>
  );
}

export default HomePage;
