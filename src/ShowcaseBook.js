import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showcaseBooksData from './showcaseBooksData.json';

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const book = showcaseBooksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  if (!bookData) {
    return <div>Not found</div>;
  }

  // Use bookData instead of book
  const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
    bookData.traits.every((trait) => details.tags.includes(trait))
  );

  return (
    <div className="showcase-book">
      <h2>{bookData.name}</h2>
      <p>{bookData.description}</p>
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