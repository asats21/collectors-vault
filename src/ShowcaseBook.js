import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showcaseBooksData from './showcaseBooksData.json'; // JSON file with book data

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams(); // Get the book key from the URL
  const [bookData, setBookData] = useState(null);

  // Load book data for the given key
  useEffect(() => {
    const book = showcaseBooksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
    book.traits.every((trait) => details.tags.includes(trait))
  );

  if (!bookData) {
    return <div>Not found</div>;
  }

  return (
    <div className="showcase-book">
      <h2>{book.name}</h2>
      <p>{book.description}</p>
      <div className="sats-grid">
        {matchingSats.map(([sat, details]) => (
          <div key={sat} className="sat-card">
            <span className="sat-number">#{sat}</span>
            <div className="sat-tags">
              {details.tags.map((tag) => (
                <span key={tag} className={`tag-${tag.replace(' ', '-')}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseBook;