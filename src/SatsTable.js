import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash } from 'react-icons/fa';
import { isPalindrome, getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { RenderTags } from "./RenderTags";
import { getFormattedSupply } from "./Rarities";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';
import { FiCalendar } from "react-icons/fi";
import { FaCube } from "react-icons/fa";

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick, isReadOnly }) => {

  const displaySatNumber = (sat) => {
    const subPaliLength = getSubPaliLength(sat);
    if (subPaliLength) {
      return '#' + displayUniformPalinception(sat, subPaliLength);
    }
    if(isRodarmorName(sat)) {
      return getRodarmorName(sat);
    }

    return '#' + sat;
  }

  const renderRarity = (tags) => {
    const supply = getFormattedSupply(tags);
    if(!supply)
      return ``;

    return supply ? `1/${supply.total}` : ``;
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Sat Number</th>
                <th></th>
                <th>Rarity</th>
                <th>Block</th>
                <th>Year</th>
                <th>E</th>
                {/* <th>W</th> */}
                { !isReadOnly && 
                  <th></th>
                }
              </tr>
            </thead>
            <tbody>
              {currentSats.map(({ sat, details, weightSum }, index) => (
                <tr key={sat}>
                  <td>{offset + index + 1}</td>
                  <td>
                      { displaySatNumber(sat) }
                  </td>
                  <td>
                    <div className="sat-tags">
                      <RenderTags tags={details.tags} />
                    </div>
                  </td>
                  <td>{renderRarity(details.tags)}</td>
                  <td><span className={isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}>{details.block_number}</span></td>
                  <td>{details.year}</td>
                  <td>{details.epoch}</td>
                  {/* <td>{weightSum}</td> */}
                  { !isReadOnly && 
                    <td>
                      <button
                        className="delete-button fw-bold"
                        onClick={() => handleDelete(sat)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - Icon Compact */}
      <div className="d-md-none">
        <div className="row g-1">
          {currentSats.map(({ sat, details }) => (
            <div className="col-12" key={sat}>
              <div className="card bg-dark text-white mb-1">
                <div className="card-body p-2">
                  {/* Top Line: Tags + Delete Button */}
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <div className="sat-tags flex-grow-1 pe-2" style={{maxWidth: '85%'}}>
                      <RenderTags tags={details.tags} />
                    </div>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(sat)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Bottom Line: SAT + Metadata */}
                  <div className="d-flex align-items-center justify-content-between gap-2 text-nowrap mt-2">
                    {/* Sat Number */}
                    <div className="d-flex align-items-center text-truncate" style={{maxWidth: '40%'}}>
                      <span className="fw-bold">
                        { displaySatNumber(sat) }
                      </span>
                    </div>

                    <div className='d-flex gap-2'>
                      {/* Block */}
                      <div className="d-flex align-items-center">
                        <FaCube className="me-1" size={12} />
                        <span className={isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}>
                          {details.block_number}
                        </span>
                      </div>

                      {/* Year */}
                      <div className="d-flex align-items-center">
                        <FiCalendar className="me-1" size={12} />
                        {details.year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 &&
        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          previousLinkClassName={'pagination-link'}
          nextLinkClassName={'pagination-link'}
          disabledClassName={'pagination-disabled'}
          activeClassName={'pagination-active'}
        />
      }
    </>
  );
};

export default SatsTable;