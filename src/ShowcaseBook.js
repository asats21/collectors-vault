import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import showcaseBooksData from './showcaseBooksData.json';

import { FaCube } from "react-icons/fa";
import { renderTags } from "./TagIcons";

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    const book = showcaseBooksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  if (!bookData) {
    return <div className="text-center mt-5">Not found</div>;
  }

  // Filter sats that match the book's traits
  const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
    bookData.traits.every((trait) => details.tags.includes(trait))
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{bookData.name}</h3>
      <p className="mb-4">{bookData.description}</p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4">
        {matchingSats.map(([sat, details]) => (
          <div key={sat} className="col">
            <div className="sat-card p-3">
              <div className="sat-year text-center fw-bold small">{details.year} </div>
              <div className="sat-number text-center">{sat}</div>
              <div className="sat-block text-center fw-bold small"> <FaCube /> {details.block_number}</div>
              <div className="sat-tags mt-3 d-flex justify-content-center">
                  {renderTags(details.tags)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseBook;