import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import booksData from './booksData.json'; // Adjust the path as needed

const BooksList = () => {
  const [books] = useState(booksData);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-light">Available Books</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="list-group">
            {books.map((book) => (
              <Link 
                key={book.name} 
                to={`/books/${book.key}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              >
                {book.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksList;