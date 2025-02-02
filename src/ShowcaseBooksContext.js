// src/contexts/ShowcaseBooksContext.js
import React, { createContext, useState, useEffect } from 'react';
import showcaseBooksData from './showcaseBooksData.json';

const ShowcaseBooksContext = createContext();

export const ShowcaseBooksProvider = ({ children }) => {
  const [showcaseBooks, setShowcaseBooks] = useState([]);

  // Load initial data from JSON file
  useEffect(() => {
    setShowcaseBooks(showcaseBooksData);
  }, []);

  // Function to add user-defined books (for future use)
  const addUserBook = (newBook) => {
    setShowcaseBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <ShowcaseBooksContext.Provider value={{ showcaseBooks, addUserBook }}>
      {children}
    </ShowcaseBooksContext.Provider>
  );
};

export default ShowcaseBooksContext;