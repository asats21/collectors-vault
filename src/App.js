import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import ChallengeBook from './ChallengeBook';  // Import your ChallengeBook component
import ChallengeBooksList from './ChallengeBooksList';  // Import the Challenge Books page
import ShowcaseBook from './ShowcaseBook';  // Import your ChallengeBook component
import ShowcaseBooksList from './ShowcaseBooksList';  // Import the Showcase Books page
import MySats from './MySats';  // Import the Index page

function App() {

  const [satCollection, setSatCollection] = useState(() => {
    // Load from localStorage or initialize with an empty object
    const savedCollection = localStorage.getItem('satCollection');
    return savedCollection ? JSON.parse(savedCollection) : {};
  });

  // Save satCollection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('satCollection', JSON.stringify(satCollection));
  }, [satCollection]);

  function Navigation() {
    return (
      <nav>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button className="nav-button my-sats">My Sats</button>
          </Link>
          <Link to="/challenge-books" style={{ textDecoration: 'none' }}>
            <button className="nav-button challenge-books">Challenge Books</button>
          </Link>
          <Link to="/showcase-books" style={{ textDecoration: 'none' }}>
            <button className="nav-button showcase-books">Showcase Books</button>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <Router>
      <div className="container my-5">
        <h1 className="text-center mb-4">Sat Collector's Vault</h1>
        <Navigation/>
        <Routes>
          <Route path="/" element={<MySats satCollection={satCollection} setSatCollection={setSatCollection} />} />
          <Route path="/challenge-books" element={<ChallengeBooksList satCollection={satCollection} />} />
          <Route path="/challenge-books/:bookKey" element={<ChallengeBook satCollection={satCollection} />} />
          <Route path="/showcase-books" element={<ShowcaseBooksList satCollection={satCollection} />} />
          <Route path="/showcase-books/:bookKey" element={<ShowcaseBook satCollection={satCollection} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
