import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash } from 'react-icons/fa';
import { isPalindrome, getSubPaliLength, displayUniformPalinception } from "./TagDetection";
import { RenderTags } from "./RenderTags";
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {
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
                <th>Block</th>
                <th>Year</th>
                <th>Epoch</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentSats.map(({ sat, details, weightSum }, index) => (
                <tr key={sat}>
                  <td>{offset + index + 1}</td>
                  <td>
                    {(() => {
                      const subPaliLength = getSubPaliLength(sat);
                      if (subPaliLength) {
                        return displayUniformPalinception(sat, subPaliLength);
                      }
                      if(isRodarmorName(sat)) {
                        return getRodarmorName(sat);
                      }

                      return '#' + sat;
                    })()}
                  </td>
                  <td>
                    <div className="sat-tags">
                      <RenderTags tags={details.tags} />
                    </div>
                  </td>
                  <td><span className={isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}>{details.block_number}</span></td>
                  <td>{details.year}</td>
                  <td>{details.epoch}</td>
                  <td>
                  <button
                    className="delete-button fw-bold"
                    onClick={() => handleDelete(sat)}
                  >
                    <FaTrash />
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="d-md-none">
        <div className="row">
          {currentSats.map(({ sat, details, weightSum }, index) => (
            <div className="col-12 mb-4" key={sat}>
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h5 className="card-title">
                    {(() => {
                      const subPaliLength = getSubPaliLength(sat);
                      if (subPaliLength) {
                        return displayUniformPalinception(sat, subPaliLength);
                      }
                      if (isRodarmorName(sat)) {
                        return getRodarmorName(sat);
                      }
                      return '#' + sat;
                    })()}
                  </h5>
                  <p className="card-text">
                    <strong>Block: </strong>
                    <span className={isPalindrome(details.block_number) ? 'table-palindromic-block' : ''}>
                      {details.block_number}
                    </span>
                    <br />
                    <strong>Year: </strong>{details.year}
                    <br />
                    <strong>Epoch: </strong>{details.epoch}
                  </p>
                  <div className="sat-tags mb-3">
                    <RenderTags tags={details.tags} />
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(sat)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pageCount > 1 &&
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
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