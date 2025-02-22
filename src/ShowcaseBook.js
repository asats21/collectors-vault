import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { renderRarity, displaySatNumber, renderYear, renderBlockNumber } from "./Helpers";
import { RenderTags } from "./RenderTags";
import { getFormattedSupply } from "./Rarities";
import { sortSatsByWeight } from './tagWeights';
import ShowcaseBooksContext from './ShowcaseBooksContext';

import { RiNumbersFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";

const ShowcaseBook = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);
  const { showcaseBooks } = useContext(ShowcaseBooksContext);
  const cardRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (showcaseBooks && bookKey) {
      const book = showcaseBooks.find((b) => b.key === bookKey);
      setBookData(book || null); // Ensure null if not found
    }
  }, [bookKey, showcaseBooks]);

  /**
   * updateTransform combines the tilt (rotate) and scale (expansion) effects.
   * The `expIndex` parameter defaults to the current expandedIndex,
   * but toggleExpand will pass in the new value so that the update is immediate.
   */
  const updateTransform = (index, tiltX = 0, tiltY = 0, expIndex = expandedIndex) => {
    const card = cardRefs.current[index];
    if (card) {
      const scale = expIndex === index ? 1.5 : 1;
      // The transform combines perspective, tilt, a slight translateZ (for depth) and scale.
      card.style.transform = `
        perspective(1000px)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
        translateZ(10px)
        scale(${scale})
      `;
      // Ensure the expanded card appears on top.
      card.style.zIndex = expIndex === index ? 10 : 1;
    }
  };

  const handleMouseMove = (index, e) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    // Get the relative mouse position (0 to 1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate tilt: adjust these multipliers to change the effect's strength.
    const tiltX = (0.5 - x) * 30;
    const tiltY = (y - 0.5) * 20;
    
    updateTransform(index, tiltX, tiltY);
  };

  const handleMouseLeave = (index) => {
    // Reset the tilt to 0 while keeping the current scale (expanded or not)
    updateTransform(index, 0, 0);
  };

  const toggleExpand = (index) => {
    // Determine the new expanded index (toggle behavior)
    const newExpandedIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newExpandedIndex);

    // Update all cards with the new expansion state and reset tilt to 0
    cardRefs.current.forEach((card, i) => {
      if (card) {
        updateTransform(i, 0, 0, newExpandedIndex);
      }
    });
  };

  const displayHeader = (bookData) => {
    return (<>
    <div className='d-flex justify-content-between'>
      <h1 className="" style={{ color: "#fff"}}>{bookData.name}</h1>
      <h3 className=""> {displaySupplyFigures(bookData)}</h3>
    </div>
    <p className="mb-4 small text-decoration-underline">{bookData.difficulty}</p>
    <p className="mb-4">{bookData.description}</p>
    </>);
  }

  if (!bookData) {
    return <div className="text-center mt-5">Not found</div>;
  }

  if (!bookData.traits) {
    return <div className="text-center mt-5">Invalid book configuration</div>;
  }

  const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
    bookData.traits.every((trait) => details.tags?.includes(trait))
  );

  const displaySupplyFigures = (book) => {
    const supplyData = book.total ? { total: book.total, found: book.found } : getFormattedSupply(book.traits);
    
    return supplyData ? (
        <div className="fw-bold d-flex">
            <span data-bs-toggle="tooltip" data-bs-placement="top" title="Total Supply">
                <RiNumbersFill />{supplyData.total}
            </span>
            {supplyData.found && (
                <span className='ms-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Found">
                    <CgSearchFound />{supplyData.found}
                </span>
            )}
        </div>
    ) : null;
  }

  if (matchingSats.length === 0) {
    return (
      <div className="container mt-4">
        {displayHeader(bookData)}
        <div className="text-center mt-5">No matching items found in this collection</div>
      </div>
    );
  }

  const sortedSats = sortSatsByWeight(Object.fromEntries(matchingSats));

  return (
    <div className="container mt-4">
      {displayHeader(bookData)}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-4">
        {sortedSats.map(({ sat, details }, index) => (
          <div key={sat} className="col">
            <div 
              className="sat-card px-1 py-4"
              ref={el => cardRefs.current[index] = el}
              onClick={() => toggleExpand(index)}
              onMouseMove={(e) => handleMouseMove(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                position: 'relative' // Ensures z-index works as expected
              }}
            >
              <div className="sat-year text-center fw-bold small">{ renderYear(details) }</div>
              <div className="sat-number text-center">
                { displaySatNumber(sat)}
              </div>
              <div className={`sat-block text-center fw-bold small`}>
                { renderBlockNumber(details) }
              </div>
              <div className="sat-tags mt-3 d-flex justify-content-center" style={{ rowGap: "0.5rem" }}>
                <RenderTags tags={details.tags || []} />
              </div>
              { renderRarity(details.tags || []) }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcaseBook;