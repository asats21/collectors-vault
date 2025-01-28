import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaTrash, FaGem, FaRegGem, FaPizzaSlice, FaHourglass, FaCrosshairs, FaImage } from 'react-icons/fa';
import { FaBluesky } from "react-icons/fa6";
import { TbAlpha, TbOmega } from "react-icons/tb";

const SatsTable = ({ currentSats, offset, handleDelete, pageCount, handlePageClick }) => {

  // Mapping tags to corresponding Font Awesome icons and colors
  const tagIcons = {
    alpha: {icon: <TbAlpha className="icon" style={{color: "#FF6F00"}}/>, number: 2 },
    omega: {icon: <TbOmega className="icon" style={{color: "#118AB2"}}/>, number: 2 },
    uncommon: {icon: <FaGem className="icon" style={{color: "#ED2B9C"}}/>, number: 1 },
    black_uncommon: {icon: <FaRegGem className="icon" style={{color: '#999'}} />, number: 1 },
    pizza: {icon: <FaPizzaSlice className="icon" style={{color: '#F2A900'}} />, number: 2 },
    jpeg: {icon: <FaImage className="icon" style={{color: '#037F5E'}} />, number: 2 },
    hitman: {icon: <FaCrosshairs className="icon" style={{color: '#E05C5C'}} />, number: 2 },
    palindrome: {icon: <FaBluesky className="icon" style={{color: '#6AA8C3'}}/>, number: 1 },
    uniform: {icon: <><FaBluesky className="icon" style={{color: '#118AB2'}} /><FaBluesky className="icon" style={{color: '#118AB2'}} /></>, number: 2 },
    perfect: {icon: <><FaBluesky className="icon" style={{color: '#E89A02'}} /><FaBluesky className="icon" style={{color: '#E89A02'}} /></>, number: 3 },
    paliblock: {icon: <FaBluesky className="icon" style={{color: '#118AB2', padding: '1px', border: '1px solid #118AB2'}} />, number: 10 },
    vintage: {icon: <FaHourglass className="icon" style={{color: '#F6BB41'}} />, number: 2 },
    '2_digits': {icon: <div className="fw-bold">2D</div>, number: 5 },
    '3_digits': {icon: <div className="fw-bold">3D</div>, number: 5 },
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
          <span className='me-1'>
          { React.cloneElement(item.icon, { key: index }) }
          </span>
        ) : (
          <span key={item.tag} className={`tag-${item.tag.replace(' ', '-')} me-1`}>
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