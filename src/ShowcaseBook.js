import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { isPalindrome } from "./Helpers";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { FaCube } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { RenderTags } from "./RenderTags";
import ShowcaseBooksContext from './ShowcaseBooksContext';

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);

  // Correct context property name (should match what's provided in your provider)
  const { showcaseBooks } = useContext(ShowcaseBooksContext);

  useEffect(() => {
    const book = showcaseBooks.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey, showcaseBooks]);

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
              <div className="sat-number text-center">
                {isRodarmorName(sat) ? getRodarmorName(sat) : sat}
              </div>
              <div className={`sat-block text-center fw-bold small ${isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}`}> 
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {isPalindrome(details.block_number) ? 
                      <FaBluesky className="icon" style={{color: '#118AB2', padding: '1px', border: '1px solid #118AB2'}}/> 
                    : 
                      <FaCube />
                  } {details.block_number}
                </span>
              </div>
              <div className="sat-tags mt-3 d-flex justify-content-center" style={{"rowGap": "0.5rem"}}>
                <RenderTags tags={details.tags} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseBook;