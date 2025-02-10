import React from 'react';
import { Link } from 'react-router-dom';
import challengeBooksData from './challengeBooksData.json';
import useBookCompletion from './useBookCompletion';
import { RenderTags } from "./RenderTags";

// Component for individual books
const BookCard = ({ book, satCollection }) => {
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
      <Link to={`challenge-books/${book.key}`} className="book-link challenge-book-header">
        <h2>{book.name}</h2>
        {book.display_tags &&
          <div className="sat-tags mb-2">
            <RenderTags tags={book.display_tags} />
          </div>
        }
        {book.short_description &&
          <div>{book.short_description}</div>
        }
        <p className='small mt-2'>
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

const ChallengeBooksList = ({ satCollection }) => {
  // Group books by difficulty
  const groupedBooks = challengeBooksData.reduce((acc, book) => {
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
    <div className="">

      {/* Header */}
      <div className="page-header mt-4 mt-md-2">
        <h1>Challenge Books</h1>
      </div>

      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list mt-4">
            {groupedBooks[difficulty]?.map((book) => (
              <BookCard
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

export default ChallengeBooksList;