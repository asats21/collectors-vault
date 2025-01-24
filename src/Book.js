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
        const satsForLevel = Object.entries(satCollection)
          .filter(([sat, details]) => {
            const hasRequiredTags = level.requirements.every((req) =>
              req.tags.every((tag) => details.tags.includes(tag))
            );
            return hasRequiredTags;
          })
          .sort((a, b) => a[1].tags.length - b[1].tags.length); // Sort by the number of tags
  
        const selectedSat = satsForLevel.length > 0 ? satsForLevel[0][0] : null; // Pick the sat with the least tags
  
        return {
          level: level.name,
          isComplete: satsForLevel.length >= level.requirements[0].count,
          sat: selectedSat,
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
      <ul className="levels">
        {completedLevels.map((level, index) => (
          <li
            key={index}
            className={level.isComplete ? "level-complete" : "level-incomplete"}
          >
            <h3>
              {level.level} {level.isComplete ? "✅" : "❌"}
            </h3>
            <p>
              <strong>Requirements:</strong>
            </p>
            <ul class='mb-3'>
              {level.requirements.map((req, i) => (
                <li key={i}>
                  At least {req.count} sats with tags: {req.tags.join(", ")}
                </li>
              ))}
            </ul>
            {level.isComplete && (
              <p>
                <strong>Sat:</strong> {level.sat}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Book;
