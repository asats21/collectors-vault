import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { addSatsToCollection, deleteSatFromCollection } from './satUtils';

const MySats = ({ satCollection, setSatCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // Current page index
  const satsPerPage = 20; // Number of sats per page

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSatCollection((prev) => addSatsToCollection(input, prev));
      setInput('');
      setShowModal(false);
    }
  };

  // Handle sat deletion
  const handleDelete = (sat) => {
    setSatCollection((prev) => deleteSatFromCollection(sat, prev));
  };

  // Pagination logic
  const pageCount = Math.ceil(Object.keys(satCollection).length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = Object.entries(satCollection)
    .slice(offset, offset + satsPerPage)
    .map(([sat, details]) => ({ sat, details }));

  // Handle page change
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="my-sats-container">
      {/* Header + Add Button */}
      <div className="sats-header">
        <h1>My Sats</h1>
        <button
          className="nav-button add-sats"
          onClick={() => setShowModal(true)}
        >
          Add Sats
        </button>
      </div>

      {/* Sats Table */}
      <div className="table-responsive">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Sat Number</th>
              <th>Tags</th>
              <th>Block</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentSats.map(({ sat, details }, index) => (
              <tr key={sat}>
                <td>{offset + index + 1}</td> {/* Position (1, 2, 3, etc.) */}
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

      {/* Add Sats Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="cyber-modal"
        centered // Center the modal on the screen
        size="lg" // Make the modal larger
      >
        <Modal.Header className="modal-header-glow">
          <Modal.Title>Add Sats to Vault</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-glow">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter sat numbers (comma/space/newline separated):</Form.Label>
              <Form.Control
                as="textarea"
                rows={20} // Increase the number of rows
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="cyber-input"
              />
            </Form.Group>
            <div className="text-center mt-4"> {/* Center the button and add padding */}
              <button type="submit" className="nav-button add-sats">
                Add Sats
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MySats;