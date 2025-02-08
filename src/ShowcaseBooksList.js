import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RenderTags, tagIcons } from "./RenderTags"; // Import tagIcons along with RenderTags
import { getSupply } from "./Rarities";
import { RiNumbersFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";
import ShowcaseBooksContext from './ShowcaseBooksContext';

const ShowcaseBooksList = ({ satCollection }) => {
  const [loading, setLoading] = useState(true);
  const [matchedSats, setMatchedSats] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  
  const { showcaseBooks } = useContext(ShowcaseBooksContext);

  useEffect(() => {
    if (!showcaseBooks) return;

    // Process sat matches for each book
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

  const displaySupplyFigures = (book) => {
    const supplyData = book.total ? { total: book.total, found: book.found } : getSupply(book.traits);
    return supplyData ? (
      <div className="fw-bold">
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
  };

  // Define filter options for the five tags
  const filterOptions = [
    { key: 'palindrome', label: 'Palindrome', icon: tagIcons['palindrome']?.icon, tooltip: tagIcons['palindrome']?.tooltip },
    { key: 'uniform_palinception', label: 'Uniform Palinception', icon: tagIcons['uniform_palinception']?.icon, tooltip: tagIcons['uniform_palinception']?.tooltip },
    { key: 'perfect_palinception', label: 'Perfect Palinception', icon: tagIcons['perfect_palinception']?.icon, tooltip: tagIcons['perfect_palinception']?.tooltip },
    { key: 'jpeg', label: 'JPEG', icon: tagIcons['jpeg']?.icon, tooltip: tagIcons['jpeg']?.tooltip },
    { key: 'pizza', label: 'Pizza', icon: tagIcons['pizza']?.icon, tooltip: tagIcons['pizza']?.tooltip },
  ];

  const toggleFilter = (tag) => {
    setActiveFilter((prevTag) => (prevTag === tag ? null : tag));
  };

  if (loading || !showcaseBooks) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div className="showcase-books-header mt-4 mt-md-2">
        <h1>Showcase Books</h1>
      </div>

      {/* Filter Bar */}
      <div className="sat-tags d-flex justify-content-start align-items-center gap-3 mt-2 mb-4">
        {filterOptions.map(option => (
          <span
            key={option.key}
            onClick={() => toggleFilter(option.key)}
            style={{
              cursor: 'pointer',
              border: activeFilter === option.key ? "1px solid #C38BFA" : "",
              "box-shadow": activeFilter === option.key ? "0 0 10px #C38BFA" : "",
            }}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={option.tooltip}
          >
            {option.icon}
          </span>
        ))}
      </div>

      {difficultyOrder.map((difficulty) => {
        const filteredBooks = showcaseBooks.filter((book) =>
          book.difficulty === difficulty &&
          (!activeFilter || book.traits.includes(activeFilter))
        );
        if (filteredBooks.length === 0) return null;
        return (
          <div key={difficulty} className="difficulty-tier">
            <h2>{difficulty}</h2>
            <ul className="books-list">
              {filteredBooks.map((book) => (
                <li key={book.key} className={`showcase-book-item ${getColor(matchedSats[book.key])}`}>
                  <Link to={`/showcase-books/${book.key}`} className="book-link">
                    <div className='showcase-book-header d-flex justify-content-between'>
                      <h2 className={`${getColor(matchedSats[book.key])} me-2`}>{book.name}</h2>
                      <div className={`fw-bold h3 ${getColor(matchedSats[book.key])}`}>
                        {matchedSats[book.key]?.length || 0}
                      </div>
                    </div>
          
                    <div className='d-flex justify-content-between'>
                      <div className="sat-tags d-flex justify-content-start">
                        <RenderTags tags={book.traits} />
                      </div>
                      {displaySupplyFigures(book)}
                    </div>
          
                    <p className='mt-2'>{book.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

    </div>
  );
};

export default ShowcaseBooksList;