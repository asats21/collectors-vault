import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RenderTags } from "./RenderTags";
import showcaseBooksData from './showcaseBooksData.json';
import { RiNumbersFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";
import { Tooltip } from "bootstrap";

const ShowcaseBooksList = ({ satCollection }) => {
  const [loading, setLoading] = useState(true);
  const [matchedSats, setMatchedSats] = useState({});

  useEffect(() => {
    // Initialize Bootstrap tooltips once
    setTimeout(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach((tooltipEl) => new Tooltip(tooltipEl));
    }, 100);

    // Process SAT matches outside of render
    const satMatches = {};
    showcaseBooksData.forEach((book) => {
      satMatches[book.key] = Object.entries(satCollection).filter(([_, details]) =>
        book.traits.every((trait) => details.tags.includes(trait))
      );
    });
    setMatchedSats(satMatches);
    setLoading(false);
  }, [satCollection]);

  // Define difficulty order
  const difficultyOrder = ['Novice', 'Collector', 'Expert', 'Elite', 'Zenite'];

  const getColor = (matchingSats) => (matchingSats.length > 0 ? "purple" : "gray");

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div className="showcase-books-page">
      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list">
            {showcaseBooksData
              .filter((book) => book.difficulty === difficulty)
              .map((book) => (
                <li key={book.key} className={`showcase-book-item ${getColor(matchedSats[book.key])}`}>
                  <Link to={`/showcase-books/${book.key}`} className="book-link">
                    <div className='showcase-book-header d-flex justify-content-between'>
                      <h2 className={`${getColor(matchedSats[book.key])} me-1`}>{book.name}</h2>
                      <div className={`fw-bold h3 ${getColor(matchedSats[book.key])}`}>{matchedSats[book.key].length}</div>
                    </div>

                    <div className='d-flex justify-content-between'>
                      <div className="sat-tags d-flex justify-content-start">
                        <RenderTags tags={book.traits} />
                      </div>
                      {book.supply &&
                        <div className="fw-bold">
                          <span data-bs-toggle="tooltip" data-bs-placement="top" title="Total Supply">
                            <RiNumbersFill />{book.supply}
                          </span>
                          {book.found &&
                            <span className='ms-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Found">
                              <CgSearchFound />{book.found}
                            </span>
                          }
                        </div>
                      }
                    </div>

                    <p className='mt-2'>{book.description}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowcaseBooksList;