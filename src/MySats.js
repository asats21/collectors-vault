import React, { useState } from 'react';

import { Modal, Button, Form } from 'react-bootstrap';  // Import required components

import { isPalindrome, isPerfectPalinception, isUniformPalinception, isAlpha, isOmega, getBlock } from './Helpers';
import { isPizza } from './Pizza';
import { isJpeg } from './Jpeg';

const MySats = ({ satCollection, setSatCollection }) => {

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleAddSats(input);
      setInput('');
      setShowModal(false);  // Close modal after submission
    }
  };

  const handleAddSats = (input) => {
    const newSats = input
      .split(/\s*,\s*|\s+/) // Split by comma or whitespace
      .filter(Boolean); // Remove empty strings
  
    setSatCollection((prevCollection) => {
      const updatedCollection = { ...prevCollection };
      newSats.forEach((sat) => {
        const satNumber = Number(sat);  // Convert to number
        const blockNumber = getBlock(satNumber);
  
        if (!updatedCollection[sat]) {
          updatedCollection[sat] = {
            tags: [],
            block_number: blockNumber,
            price: null,
          };
        }
  
        if (isPizza(satNumber)) {
          updatedCollection[sat].tags.push('pizza');
        }

        if (isJpeg(satNumber)) {
          updatedCollection[sat].tags.push('jpeg');
        }

        if (isPalindrome(satNumber)) {
          updatedCollection[sat].tags.push('palindrome');

          if(blockNumber >= 210000)
            updatedCollection[sat].tags.push('Epoch1+');
        }

        if (isUniformPalinception(satNumber)) {
          updatedCollection[sat].tags.push('uniform');
        }

        if (isPerfectPalinception(satNumber)) {
          updatedCollection[sat].tags.push('perfect');
        }

        if (isPalindrome(blockNumber)) {
          updatedCollection[sat].tags.push('paliblock');
        }

        if (blockNumber < 1000) {
          updatedCollection[sat].tags.push('vintage');
        }

        if (isAlpha(satNumber)) {
          updatedCollection[sat].tags.push('alpha');
        }

        if (isOmega(satNumber)) {
          updatedCollection[sat].tags.push('omega');
        }

        if (blockNumber === 9) {
          updatedCollection[sat].tags.push('block 9');
        }

        if (blockNumber === 78) {
          updatedCollection[sat].tags.push('block 78');
        }

      });
      return updatedCollection;
    });
  };
    
  const handleDeleteSat = (sat) => {
    setSatCollection((prevCollection) => {
      const updatedCollection = { ...prevCollection };
      delete updatedCollection[sat];
      return updatedCollection;
    });
  };

  function SatList({ collection }) {
  return (
      <div className="table-responsive">
      <table className="table table-dark table-striped">
          <thead
          style={{
              border: "1px solid #444",
              minWidth: "800px", // Ensure the table is readable on smaller screens
          }}
          >
          <tr>
              <th>Sat Number</th>
              <th>Tags</th>
              <th>Block Number</th>
              {/* <th>Price</th> */}
              <th>Actions</th> {/* Add a column for actions */}
          </tr>
          </thead>
          <tbody>
          {Object.entries(collection).map(([sat, details]) => (
              <tr key={sat}>
              <td>{sat}</td>
              <td>{details.tags.join(', ')}</td>
              {/* <td>{details.block_number || 'N/A'}</td> */}
              <td>{details.price !== null ? details.price : 'N/A'}</td>
              <td>
                  <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteSat(sat)}
                  >
                  &times; {/* Red cross symbol */}
                  </button>
              </td>
              </tr>
          ))}
          </tbody>
      </table>
      </div>
  );
  }

  return (
    <div>

      {/* Button to open the modal */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Sats
      </Button>

      {/* Modal for adding sats */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sat Numbers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="satInput">
              <Form.Label>Enter sat numbers (separated by comma, whitespace or newline)</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter sat numbers"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="mt-4">
        <SatList collection={satCollection} />
      </div>
    </div>
  );
};

export default MySats;