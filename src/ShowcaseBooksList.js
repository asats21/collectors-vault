import React from 'react';
import { Link } from 'react-router-dom';
import showcaseBooksData from './showcaseBooksData.json';

const ShowcaseBooksList = ({ satCollection }) => {
  return (
    <div className="showcase-books-page">
      <h1>Showcase Books</h1>
      <ul className="books-list">
        {showcaseBooksData.map((book) => {
          // Filter SATs that match the book's traits
          const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
            book.traits.every((trait) => details.tags.includes(trait))
          );

          return (
            <li key={book.key} className={`book-item ${book.difficulty.toLowerCase()}`}>
              <Link to={`/showcase-books/${book.key}`} className="book-link">
                <h2>{book.name}</h2>
                <p>{book.description}</p>
                <p>Difficulty: {book.difficulty}</p>
                <p className="mt-2">Matching sats: {matchingSats.length}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowcaseBooksList;