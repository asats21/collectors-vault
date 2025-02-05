import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RenderTags } from "./RenderTags";
import { RiNumbersFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";
import ShowcaseBooksContext from './ShowcaseBooksContext';

const ShowcaseBooksList = ({ satCollection }) => {
  const [loading, setLoading] = useState(true);
  const [matchedSats, setMatchedSats] = useState({});
  
  const { showcaseBooks } = useContext(ShowcaseBooksContext);

  useEffect(() => {
    if (!showcaseBooks) return;

    // Process sat matches
    const processMatches = () => {
      const satMatches = {};
      showcaseBooks.forEach((book) => {
        satMatches[book.key] = Object.entries(satCollection).filter(([_, details]) =>
          book.traits.every((trait) => details.tags.includes(trait))
        );
      });
      setMatchedSats(satMatches);
      setLoading(false);
    };

    processMatches();

  }, [satCollection, showcaseBooks]);

  const difficultyOrder = ['Novice', 'Collector', 'Expert', 'Elite', 'Zenite'];

  const getColor = (matchingSats) => (matchingSats?.length > 0 ? "purple" : "gray");

  if (loading || !showcaseBooks) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div className="">

      {/* Header */}
      <div className="sats-header mt-4 mt-md-none">
        <h1>Showcase Books</h1>
      </div>

      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list">
            {showcaseBooks
              .filter((book) => book.difficulty === difficulty)
              .map((book) => (
                <li key={book.key} className={`showcase-book-item ${getColor(matchedSats[book.key])}`}>
                  <Link to={`/showcase-books/${book.key}`} className="book-link">
                    <div className='showcase-book-header d-flex justify-content-between'>
                      <h2 className={`${getColor(matchedSats[book.key])} me-1`}>{book.name}</h2>
                      <div className={`fw-bold h3 ${getColor(matchedSats[book.key])}`}>
                        {matchedSats[book.key]?.length || 0}
                      </div>
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