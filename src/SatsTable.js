import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash } from 'react-icons/fa';
import { isPalindrome } from "./Helpers";
import { RenderTags } from "./RenderTags";

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {

  return (
    <>
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
                <td>#{sat}</td>
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