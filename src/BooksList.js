import React from 'react';
import { Link } from 'react-router-dom';
import booksData from './booksData.json';
import useBookCompletion from './useBookCompletion';

// Component for individual book progress
const BookProgressItem = ({ book, satCollection }) => {
  const completedLevels = useBookCompletion(book, satCollection);
  const totalLevels = book.levels.length;
  const completedCount = completedLevels.filter(
    (level) => level.status === 'complete'
  ).length;

  const cardColor =
    completedCount === totalLevels
      ? 'green'
      : completedCount > 0
      ? 'purple'
      : 'gray';

  return (
    <li className={`book-item ${cardColor}`}>
      <Link to={`/challenge-books/${book.key}`} className="book-link">
        <h2>{book.name}</h2>
        <p>
          Completed {completedCount} out of {totalLevels} levels
        </p>
        <div className="progress-bar">
          <div
            className={
              completedCount === totalLevels ? 'progress-bar-complete' : 'progress-bar-in-progress'
            }
            style={{ width: `${(completedCount / totalLevels) * 100}%` }}
          ></div>
        </div>
      </Link>
    </li>
  );
};

const BooksList = ({ satCollection }) => {
  // Group books by difficulty
  const groupedBooks = booksData.reduce((acc, book) => {
    const difficulty = book.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(book);
    return acc;
  }, {});

  // Define the order of difficulty tiers
  const difficultyOrder = ['Novice', 'Collector', 'Expert', 'Elite', 'Zenite'];

  return (
    <div className="books-page">
      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list mt-4">
            {groupedBooks[difficulty]?.map((book) => (
              <BookProgressItem
                key={book.key}
                book={book}
                satCollection={satCollection}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BooksList;