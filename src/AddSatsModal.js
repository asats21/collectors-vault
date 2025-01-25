import React from 'react';
import { Modal, Form } from 'react-bootstrap';

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
      </Modal.Header>
      <Modal.Body className="modal-body-glow">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Enter sat numbers (comma/space/newline separated):</Form.Label>
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