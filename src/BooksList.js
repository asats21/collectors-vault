// BooksList.js
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

  return (
    <li className="book-item">
      <Link to={`/books/${book.key}`} className="book-link">
        <h2>{book.name}</h2>
        <p>
          Completed {completedCount} out of {totalLevels} levels
        </p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(completedCount / totalLevels) * 100}%` }}
          ></div>
        </div>
      </Link>
    </li>
  );
};

const BooksList = ({ satCollection }) => {
  return (
    <div>
      <h1>My Books</h1>
      <ul className="books-list">
        {booksData.map((book) => (
          <BookProgressItem
            key={book.key}
            book={book}
            satCollection={satCollection}
          />
        ))}
      </ul>
    </div>
  );
};

export default BooksList;