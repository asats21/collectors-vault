import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { addSatsToCollection, deleteSatFromCollection } from './satUtils';
import { tagWeights } from './tagWeights'; // Import tag weights

const MySats = ({ satCollection, setSatCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const satsPerPage = 20;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setSatCollection((prev) => addSatsToCollection(input, prev));
      setInput('');
      setShowModal(false);
    }
  };

  const handleDelete = (sat) => {
    setSatCollection((prev) => deleteSatFromCollection(sat, prev));
  };

  // Calculate weight sum for each SAT
  const satsWithWeights = Object.entries(satCollection).map(([sat, details]) => {
    const weightSum = details.tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0);
    return { sat, details, weightSum };
  });

  // Sort SATs by weight sum (descending)
  const sortedSats = satsWithWeights.sort((a, b) => b.weightSum - a.weightSum);

  // Pagination logic
  const pageCount = Math.ceil(sortedSats.length / satsPerPage);
  const offset = currentPage * satsPerPage;
  const currentSats = sortedSats.slice(offset, offset + satsPerPage);

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
              <th>Weight</th> {/* New column */}
              <th>Actions</th>
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

      {/* Add Sats Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="cyber-modal"
        centered
        size="lg"
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