// Book.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import challengeBooksData from './challengeBooksData.json'; // JSON file with book data
import useBookCompletion from './useBookCompletion'; // Import the custom hook

const Book = ({ satCollection }) => {
  const { bookKey } = useParams(); // Get the book key from the URL
  const [bookData, setBookData] = useState(null);

  // Load book data for the given key
  useEffect(() => {
    const book = challengeBooksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  // Use the custom hook to get completed levels
  const bookLevels = useBookCompletion(bookData, satCollection);

  if (!bookData) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1 className='mt-3'>{bookData.name}</h1>
      <ul className="levels mt-4">
      {bookLevels.map((level, index) => (
        <li
          key={index}
          className={`level level-${level.status.replace(/ /g, '-')}`} // Convert spaces to dashes
        >
          <div className="level-content pb-5 pb-md-0">
            <div className="py-3 py-md-5">
            <h3 className='ms-2'>
              {level.level}
            </h3>
            {level.requirements.map(({ count, tags, years }, i) => (
              <li key={i} className='ms-2'>
                <div>At least {count} sats with:</div>
                <div>Tags: {tags.join(', ')}</div>
                {years?.length > 0 && <div>Years: {years.join(', ')}</div>}
              </li>
            ))}
            </div>
            {level.status === 'complete' && (
              <div className="diamond diamond-full mx-auto mx-md-5">
                <span className="small">{level.sat}</span>
              </div>
            )}
            {level.status === 'blocked' && (
              <div className="diamond diamond-blocked mx-auto mx-md-5">
                <span className="small">{level.sat}</span>
              </div>
            )}
            {level.status === 'next' && (
              <div className="diamond diamond-next mx-auto mx-md-5">
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