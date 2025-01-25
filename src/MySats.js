import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { addSatsToCollection, deleteSatFromCollection } from './satUtils';

const MySats = ({ satCollection, setSatCollection }) => {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');

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

  return (
    <div className="my-sats-container">
      {/* Header + Add Button */}
      <div className="sats-header">
        <h1>My Sats Vault</h1>
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
              <th>Sat Number</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(satCollection).map(([sat, details]) => (
              <tr key={sat}>
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

      {/* Add Sats Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="cyber-modal"
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
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="cyber-input"
              />
            </Form.Group>
            <button type="submit" className="nav-button add-sats">
              Add Sats
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MySats;