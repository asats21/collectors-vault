import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash, FaGem, FaPizzaSlice, FaFont, FaHive, FaDiceTwo, FaDiceThree } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {

  // Mapping tags to corresponding Font Awesome icons and colors
  const tagIcons = {
    alpha: {icon: <FaFont className="icon" />, number: 2 },
    uncommon: {icon: <FaGem className="icon" />, number: 1 },
    black_uncommon: {icon: <FaGem className="icon" />, number: 1 },
    pizza: {icon: <FaPizzaSlice className="icon" />, number: 2 },
    palindrome: {icon: <FaBluesky className="icon" />, number: 1 },
    uniform: {icon: <FaBluesky className="icon" />, number: 2 },
    perfect: {icon: <FaBluesky className="icon" />, number: 3 },
    paliblock: {icon: <FaHive className="icon" />, number: 10 },
    '2_digits': {icon: <FaDiceTwo className="icon" />, number: 5 },
    '3_digits': {icon: <FaDiceThree className="icon" />, number: 5 },
  };

  // Function to handle rendering of tags and icons
  const renderTags = (tags) => {
    return tags
      .map((tag) => {
        const tagInfo = tagIcons[tag];
        if (tagInfo) {
          return { type: 'icon', ...tagInfo }; // Return the icon and number if it exists
        }
        return { type: 'tag', tag }; // Return the tag text if no icon
      })
      .sort((a, b) => {
        // Sort by the number of the icon first
        return a.type === 'icon' && b.type === 'icon' ? a.number - b.number : a.type === 'icon' ? -1 : 1;
      })
      .map((item, index) =>
        item.type === 'icon' ? (
          React.cloneElement(item.icon, { key: index })
        ) : (
          <span key={item.tag} className={`tag-${item.tag.replace(' ', '-')}`}>
            {item.tag}
          </span>
        )
      );
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
                    {renderTags(details.tags)} {/* Call the renderTags function */}
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