import React from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaTimes } from "react-icons/fa";

const AddSatsModal = ({ showModal, setShowModal, input, setInput, handleSubmit }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      className="cyber-modal"
      centered
      size="lg"
    >
      <Modal.Header className="modal-header-glow">
        <Modal.Title>Add Sats to Vault</Modal.Title>
        <button 
          onClick={() => setShowModal(false)} 
          className="close-add-sats-modal-button"
        >
          <FaTimes size={24} />
        </button>
      </Modal.Header>
      <Modal.Body className="modal-body-glow">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            
            <Form.Label className='mb-2'>
              Our app can accurately identify sat numbers even when mixed with irrelevant data. 
              Try copying and pasting multiple sats at once from the wallet checker 
              at <a href="https://sating.io/" target="_blank" rel="noopener noreferrer" style={{ color: "#C38BFA", textDecoration: 'none', "fontWeight": "bold" }}>sating.io</a> to see how well it works!
            </Form.Label>

            <Form.Label>Enter sat numbers (comma OR space OR newline separated):</Form.Label>

            <Form.Control
              as="textarea"
              rows={20}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="cyber-input"
            />
          </Form.Group>
          <div className="text-center mt-4">
            <button type="submit" className="nav-button add-sats">
              Add Sats
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddSatsModal;