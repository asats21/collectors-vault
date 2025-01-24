import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PalindromeBook from './PalindromeBook';  // Import your PalindromeBook component
import BooksPage from './BooksPage';  // Import the Available Books page
import IndexPage from './IndexPage';  // Import the Index page

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

  return (
    <Router>
      <div className="container my-5">
        <Routes>
          <Route path="/" element={<IndexPage satCollection={satCollection} setSatCollection={setSatCollection} />} /> {/* Index page */}
          <Route path="/books" element={<BooksPage />} /> {/* Available books page */}
          <Route path="/books/:bookName" element={<PalindromeBook satCollection={satCollection} />} /> {/* Specific book page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
