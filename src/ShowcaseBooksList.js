import React from 'react';
import { Link } from 'react-router-dom';
import showcaseBooksData from './showcaseBooksData.json';

const ShowcaseBooksList = ({ satCollection }) => {
  // Group books by difficulty
  const groupedBooks = showcaseBooksData.reduce((acc, book) => {
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
    <div className="showcase-books-page">
      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list">
            {groupedBooks[difficulty]?.map((book) => {
              // Filter SATs that match the book's traits
              const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
                book.traits.every((trait) => details.tags.includes(trait))
              );

              return (
                <li key={book.key} className={`book-item ${book.difficulty.toLowerCase()}`}>
                  <Link to={`/showcase-books/${book.key}`} className="book-link">
                    <h2>{book.name}</h2>
                    <p>{book.description}</p>
                    <p className="mt-2">In collection: {matchingSats.length}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowcaseBooksList;