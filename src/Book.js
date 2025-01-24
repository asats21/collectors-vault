import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import booksData from './booksData.json'; // JSON file with book data

const Book = ({ satCollection }) => {
  const { bookKey } = useParams(); // Get the book key from the URL
  const [bookData, setBookData] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);

  // Load book data for the given key
  useEffect(() => {
    const book = booksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  // Check which levels are completed based on satCollection
  useEffect(() => {
    if (bookData) {
      const newCompletedLevels = bookData.levels.map((level) => {
        const satsForLevel = Object.entries(satCollection).filter(([sat, details]) => {
          const hasRequiredTags = level.requirements.every((req) =>
            req.tags.every((tag) => details.tags.includes(tag))
          );
          return hasRequiredTags;
        });

        return {
          level: level.name,
          isComplete: satsForLevel.length >= level.requirements[0].count,
          sats: satsForLevel.map(([sat, _]) => sat),
          requirements: level.requirements, // Include the requirements for display
        };
      });

      setCompletedLevels(newCompletedLevels);
    }
  }, [bookData, satCollection]);

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
            <p>
              <strong>Requirements:</strong>
            </p>
            <ul>
              {level.requirements.map((req, i) => (
                <li key={i}>
                  At least {req.count} sats with tags: {req.tags.join(', ')}
                </li>
              ))}
            </ul>
            {level.isComplete ? (
              <>
                <p>✅ Level complete!</p>
                <p>Sats: {level.sats.join(', ')}</p>
              </>
            ) : (
              <p>❌ Level not complete yet</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
