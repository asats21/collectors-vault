// Book.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import booksData from './booksData.json'; // JSON file with book data
import useBookCompletion from './useBookCompletion'; // Import the custom hook

const Book = ({ satCollection }) => {
  const { bookKey } = useParams(); // Get the book key from the URL
  const [bookData, setBookData] = useState(null);

  // Load book data for the given key
  useEffect(() => {
    const book = booksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  // Use the custom hook to get completed levels
  const bookLevels = useBookCompletion(bookData, satCollection);

  if (!bookData) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1>{bookData.name}</h1>
      <ul className="levels">
      {bookLevels.map((level, index) => (
        <li
          key={index}
          className={`level level-${level.status.replace(/ /g, '-')}`} // Convert spaces to dashes
        >
          <div className="level-content pb-5 pb-md-0">
            <div className="py-3 py-md-5">
              <h3>
                {level.level} {level.status === 'complete' ? '✅' : '❌'}
              </h3>
              <ul className="mb-3">
                {level.requirements.map((req, i) => (
                  <li key={i}>
                    At least {req.count} sats with tags: {req.tags.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
            {level.status === 'complete' && (
              <div className="diamond diamond-full mx-auto mx-md-5">
                <span className="small">{level.sat}</span>
              </div>
            )}
            {level.status === 'blocked' && (
              <div className="diamond diamond-full mx-auto mx-md-5">
                <span className="small">{level.sat}</span>
              </div>
            )}
            {level.status === 'next' && (
              <div className="diamond diamond-empty mx-auto mx-md-5">
                <span className="small">???</span>
              </div>
            )}
            {level.status === 'incomplete' && (
              <div className="diamond diamond-empty mx-auto mx-md-5">
                <span className="small">???</span>
              </div>
            )}
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default Book;