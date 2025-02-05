import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { isPalindrome } from "./TagDetection";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { FaCube } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { RenderTags } from "./RenderTags";
import ShowcaseBooksContext from './ShowcaseBooksContext';

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);
  const { showcaseBooks } = useContext(ShowcaseBooksContext);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (showcaseBooks && bookKey) {
      const book = showcaseBooks.find((b) => b.key === bookKey);
      setBookData(book || null); // Ensure null if not found
    }
  }, [bookKey, showcaseBooks]);

  const handleMouseMove = (index, e) => {
    const card = cardRefs.current[index];
    if (!card) return;
  
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
  
    const tiltX = (0.5 - x) * 30;
    const tiltY = (y - 0.5) * 20;
  
    // Apply tilt, a bit of Z-translation, and an enlarged scale
    card.style.transform = `
      perspective(1000px)
      rotateX(${tiltY}deg)
      rotateY(${tiltX}deg)
      translateZ(10px)
      scale(1.05)
    `;
    
  };
  
  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      // Reset transformations and shadow
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    }
  };

  if (!bookData) {
    return <div className="text-center mt-5">Not found</div>;
  }

  if (!bookData.traits) {
    return <div className="text-center mt-5">Invalid book configuration</div>;
  }

  const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
    bookData.traits.every((trait) => details.tags?.includes(trait))
  );

  if (matchingSats.length === 0) {
    return (
      <div className="container mt-4">
        <h3 className="mb-4">{bookData.name}</h3>
        <p className="mb-4">{bookData.description}</p>
        <div className="text-center mt-5">No matching items found in this collection</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">{bookData.name}</h3>
      <p className="mb-4">{bookData.description}</p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4">
        {matchingSats.map(([sat, details], index) => (
          <div key={sat} className="col">
            <div 
              className="sat-card p-3"
              ref={el => cardRefs.current[index] = el}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
            >
              <div className="sat-year text-center fw-bold small">{details.year}</div>
              <div className="sat-number text-center">
                {isRodarmorName(sat) ? getRodarmorName(sat) : sat}
              </div>
              <div className={`sat-block text-center fw-bold small ${isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}`}> 
                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {isPalindrome(details.block_number) ? 
                    <FaBluesky className="icon" style={{color: '#118AB2', padding: '1px', border: '1px solid #118AB2'}}/> 
                    : <FaCube />
                  } {details.block_number}
                </span>
              </div>
              <div className="sat-tags mt-3 d-flex justify-content-center" style={{"rowGap": "0.5rem"}}>
                <RenderTags tags={details.tags || []} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseBook;