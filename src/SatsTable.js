import React from 'react';
import ReactPaginate from 'react-paginate';

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Sat Number</th>
              <th>Tags</th>
              <th>Block</th>
              <th>Year</th>
              <th>Epoch</th>
              <th>Weight</th> {/* New column */}
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
                    {details.tags.map((tag) => (
                      <span key={tag} className={`tag-${tag.replace(' ', '-')}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{details.block_number}</td>
                <td>{details.year}</td>
                <td>{details.epoch}</td>
                <td>{weightSum}</td> {/* Display weight sum */}
                <td>
                <button
                  className="delete-button fw-bold"
                  onClick={() => handleDelete(sat)}
                >
                  &times; {/* Red cross symbol */}
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
    </>
  );
};

export default SatsTable;