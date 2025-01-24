import React from 'react';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        <li>
          <Link to="/books/palindrome-book">Palindrome Book</Link>
        </li>
        {/* Add other books here as necessary */}
      </ul>
    </div>
  );
};

export default BooksPage;