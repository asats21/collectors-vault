import React from 'react';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { renderTags } from "./TagIcons";
import showcaseBooksData from './showcaseBooksData.json';
import { RiNumbersFill } from "react-icons/ri";
import { CgSearchFound } from "react-icons/cg";
import { Tooltip } from "bootstrap";

const ShowcaseBooksList = ({ satCollection }) => {

  useEffect(() => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipEl) => new Tooltip(tooltipEl));
  }, []);

  // Group books by difficulty
  const groupedBooks = showcaseBooksData.reduce((acc, book) => {
    const difficulty = book.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(book);
    return acc;
  }, {});

  // Define the order of difficulty tiers
  const difficultyOrder = ['Novice', 'Collector', 'Expert', 'Elite', 'Zenite'];

  const getColor = (matchingSats) => {
    return matchingSats.length > 0 ? "purple" : "gray"; 
  }

  return (
    <div className="showcase-books-page">
      {difficultyOrder.map((difficulty) => (
        <div key={difficulty} className="difficulty-tier">
          <h2>{difficulty}</h2>
          <ul className="books-list">
            {groupedBooks[difficulty]?.map((book) => {
              // Filter SATs that match the book's traits
              const matchingSats = Object.entries(satCollection).filter(([sat, details]) =>
                book.traits.every((trait) => details.tags.includes(trait))
              );

              return (
                <li key={book.key} className={`showcase-book-item ${getColor(matchingSats)}`}>
                  <Link to={`/showcase-books/${book.key}`} className="book-link">
                    <div className='showcase-book-header d-flex justify-content-between'>
                      <h2 className={`${getColor(matchingSats)} me-1`}>{book.name}</h2>
                      <div className={`fw-bold h3 ${getColor(matchingSats)}`}>{matchingSats.length}</div>
                    </div> 

                    <div className='d-flex justify-content-between'>
                      <div className="sat-tags d-flex justify-content-start">
                        {renderTags(book.traits)}
                      </div>
                      { book.supply && 
                        <div className="fw-bold">
                          <span data-bs-toggle="tooltip" data-bs-placement="top" title="Total Supply">
                            <RiNumbersFill />{ book.supply }
                          </span>
                          { book.found && 
                            <span className='ms-1' data-bs-toggle="tooltip" data-bs-placement="top" title="Found">
                              <CgSearchFound />{ book.found }
                            </span>
                          }
                        </div>
                      }
                    </div>

                    <p className='mt-2'>{book.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowcaseBooksList;