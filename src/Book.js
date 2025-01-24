import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import booksData from './booksData.json'; // Adjust the path if needed

const Book = ({ satCollection }) => {
  const { bookKey } = useParams(); // Get the book key from the URL (e.g., "palindrome")
  const [bookData, setBookData] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);

  // Find the book based on the bookKey
  useEffect(() => {
    const foundBook = booksData.find(book => book.key === bookKey);
    setBookData(foundBook);
  }, [bookKey]);

  // Check which levels are completed based on satCollection
  useEffect(() => {
    if (bookData) {
      const newCompletedLevels = bookData.levels.map((level) => {
        const satsForLevel = Object.entries(satCollection).filter(([sat, details]) => {
          const hasRequiredTags = level.requirements.every(req => 
            req.tags.every(tag => details.tags.includes(tag))
          );
          return hasRequiredTags;
        });

        return {
          level: level.name,
          isComplete: satsForLevel.length >= level.requirements[0].count,
          sats: satsForLevel.map(([sat, _]) => sat)
        };
      });

      setCompletedLevels(newCompletedLevels);
    }
  }, [satCollection, bookData]);

  if (!bookData) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1>{bookData.name}</h1>
      <ul>
        {completedLevels.map((level, index) => (
          <li key={index}>
            <h3>{level.level}</h3>
            {level.isComplete ? (
              <>
                <p>Level complete!</p>
                <p>Sats: {level.sats.join(', ')}</p>
              </>
            ) : (
              <p>Level not complete yet</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;