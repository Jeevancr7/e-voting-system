// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/vote">Vote</Link> | <Link to="/results">Results</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
