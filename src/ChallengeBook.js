import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import challengeBooksData from './challengeBooksData.json';
import useBookCompletion from './useBookCompletion';
import { FaCube } from "react-icons/fa";
import { RenderTags } from "./RenderTags";

const Book = ({ satCollection }) => {
  const { bookKey } = useParams();
  const [bookData, setBookData] = useState(null);
  const [selectedSat, setSelectedSat] = useState(null); // Track enlarged diamond
  const enlargedCardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = enlargedCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Tilt calculations
    const tiltX = (0.5 - x) * 30;
    const tiltY = (y - 0.5) * 20;
    
    updateTransform(tiltX, tiltY);
  };

  const handleMouseLeave = () => {
    updateTransform(0, 0);
  };

  const updateTransform = (tiltX = 0, tiltY = 0) => {
    const card = enlargedCardRef.current;
    if (card) {
      card.style.transform = `
        perspective(1000px)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
        rotate(45deg) /* Keep the original rotation */
        translateZ(10px)
      `;
      card.style.zIndex = 10;
    }
  };

  useEffect(() => {
    const book = challengeBooksData.find((b) => b.key === bookKey);
    setBookData(book);
  }, [bookKey]);

  const bookLevels = useBookCompletion(bookData, satCollection);

  if (!bookData) {
    return <div>Not found</div>;
  }

  const allComplete = bookLevels.length > 0 && bookLevels.every(level => level.status === 'complete');

  const handleDiamondClick = (level) => {
    setSelectedSat(level === selectedSat ? null : level);
  };

  return (
    <div>
      <h1 className='mt-3'>{bookData.name}</h1>
      <p className="mb-3 small text-decoration-underline">{bookData.difficulty}</p>
      {bookData.description && <div>{bookData.description}</div>}
      
      <ul className="levels mt-4">
        {bookLevels.map((level, index) => (
          <li key={index} className={`level level-${allComplete ? 'complete' : (level.status === 'complete' ? 'next' : 'incomplete')}`}>
            <div className="level-content d-flex justify-content-between pb-5 pb-md-0">
              <div className="py-3 py-md-5">
                <h3 className='ms-2'>{level.level}</h3>
                {level.description && <div className='ms-2'>{level.description}</div>}
                {level.requirements.map(({ count, tags, years }, i) => (
                  <li key={i} className='ms-2 mt-2'>
                    <div>At least {count} sats with:</div>
                    <div className="sat-tags mt-1">
                      <div className='me-2'>Tags:</div><RenderTags tags={tags} />
                    </div>
                    {years?.length > 0 && <div>Years: {years.join(', ')}</div>}
                  </li>
                ))}
              </div>

              {level.status === 'complete' && (
                <div 
                  className={`diamond ${allComplete ? 'diamond-full-complete' : 'diamond-partialy-complete'} mx-auto mx-md-5`}
                  onClick={() => handleDiamondClick(level)}
                >
                  <div className="diamond-content">
                    <span className="small" style={{ marginTop: '15px' }}>{level.sat}</span>
                    <span className="small" style={{ 
                      display: "inline-flex", 
                      alignItems: "center", 
                      gap: "4px",
                      fontSize: "12px",
                      lineHeight: "1",
                      transform: "scale(0.9)"
                    }}>
                      <FaCube /> {level.block}
                    </span>
                  </div>
                </div>
              )}

              {level.status === 'incomplete' && (
                <div className="diamond diamond-empty mx-auto mx-md-5">
                  <div className="diamond-content">
                    <span className="small" style={{ marginTop: '15px' }}>???</span>
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {selectedSat && (
        <div className="overlay" onClick={() => setSelectedSat(null)}>
          <div 
            className={`diamond enlarged ${allComplete ? 'diamond-enlarged-complete' : 'diamond-enlarged-partialy-complete'}`} 
            ref={enlargedCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="diamond-content">
              <div className='small'>{selectedSat.year}</div>
              <span>{selectedSat.sat}</span>
              <div className="sat-details text-center">
                <div><FaCube /> {selectedSat.block}</div>
                <div className="sat-tags mt-3">
                  {selectedSat.tags?.length > 0 ? <RenderTags tags={selectedSat.tags} /> : ``}
                </div>
                { selectedSat.supply &&
                <div className='small text-center mt-3 fw-bold'>1 / {selectedSat.supply}</div>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;