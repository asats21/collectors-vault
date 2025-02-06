import React, { createContext, useState, useEffect } from "react";
import showcaseBooksData from "./showcaseBooksData.json";

const ShowcaseBooksContext = createContext();

export const ShowcaseBooksProvider = ({ children }) => {
  const [showcaseBooks, setShowcaseBooks] = useState([]);

  useEffect(() => {
    const loadUserBooks = () => {
      try {
        const savedUserBooks = localStorage.getItem("userShowcaseBooks");
        const userBooks = savedUserBooks ? JSON.parse(savedUserBooks) : [];
        setShowcaseBooks([...showcaseBooksData, ...userBooks]);
      } catch (err) {
        console.error("Failed to load user books:", err);
        setShowcaseBooks(showcaseBooksData);
      }
    };

    loadUserBooks();
  }, []);

  const addUserBook = (newBook) => {
    const updatedBooks = [...showcaseBooks, newBook];
    setShowcaseBooks(updatedBooks);
  };

  return (
    <ShowcaseBooksContext.Provider value={{ showcaseBooks, addUserBook, setShowcaseBooks }}>
      {children}
    </ShowcaseBooksContext.Provider>
  );
};

export default ShowcaseBooksContext;