import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import booksData from './booksData.json'; // Adjust the path as needed

const BooksPage = () => {
  const [books] = useState(booksData);

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.name}>
            <Link to={`/books/${book.key}`}>
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;