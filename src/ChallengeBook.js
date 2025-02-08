// Book.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import challengeBooksData from './challengeBooksData.json'; // JSON file with book data
import useBookCompletion from './useBookCompletion'; // Import the custom hook
import { FaCube } from "react-icons/fa";

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

  const allComplete = bookLevels.length > 0 && bookLevels.every(level => level.status === 'complete');

  return (
    <div>
      <h1 className='mt-3'>{bookData.name}</h1>
      <ul className="levels mt-4">
      {bookLevels.map((level, index) => (
        <li
          key={index}
          className={`level level-${allComplete ? 'complete' : (level.status === 'complete' ? 'next' : 'incomplete')}`} // Convert spaces to dashes
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
              <div className={`diamond ${allComplete ? 'diamond-full-complete' : 'diamond-partialy-complete'} mx-auto mx-md-5`}>
                <div className="diamond-content">
                  <span className="small" style={{'marginTop': '15px'}}>{level.sat}</span>
                  <span className="small" style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "4px",
                      fontSize: "12px",  /* Adjust the size */
                      lineHeight: "1",    /* Prevent extra spacing */
                      transform: "scale(0.9)"  /* Shrinks the whole element */
                    }}>
                    <FaCube /> {level.block}
                  </span>
                </div>
              </div>
            )}

            {level.status === 'incomplete' && (
              <div className="diamond diamond-empty mx-auto mx-md-5">
                <div className="diamond-content">
                  <span className="small" style={{'marginTop': '15px'}}>???</span>
                </div>
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