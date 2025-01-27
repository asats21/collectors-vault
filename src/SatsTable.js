import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash, FaGem, FaPizzaSlice, FaFont, FaHive, FaDiceTwo, FaDiceThree } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {

  // Mapping tags to corresponding Font Awesome icons and colors
  const tagIcons = {
    alpha: <FaFont className="icon" />,
    uncommon: <FaGem className="icon" />,
    black_uncommon: <FaGem className="icon" />,
    pizza: <FaPizzaSlice className="icon" />,
    palindrome: <FaBluesky className="icon" />,
    uniform: <FaBluesky className="icon" />,
    perfect: <FaBluesky className="icon" />,
    paliblock: <FaHive className="icon" />,
    '2_digits': <FaDiceTwo className="icon" />,
    '3_digits': <FaDiceThree className="icon" />,
  };

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
                  {details.tags
                      .map((tag) => {
                        const icon = tagIcons[tag];
                        if (icon) {
                          return { type: 'icon', icon }; // Return the icon if it exists
                        }
                        return { type: 'tag', tag }; // Return the tag text if no icon
                      })
                      .sort((a, b) => {
                        // Sort icons first, then tags
                        return a.type === 'icon' ? -1 : 1;
                      })
                      .map((item, index) =>
                        item.type === 'icon' ? (
                          React.cloneElement(item.icon, { key: index })
                        ) : (
                          <span key={item.tag} className={`tag-${item.tag.replace(' ', '-')}`}>
                            {item.tag}
                          </span>
                        )
                  )}
                  </div>
                </td>
                <td>{details.block_number}</td>
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