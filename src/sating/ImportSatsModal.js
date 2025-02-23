// ImportSatsModal.js
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { fetchSats } from './SatingApiCaller';
import { addSatsToCollection } from '../satManagement';

const ImportSatsModal = ({ show, setShow, setSatCollection, settings }) => {
  const [wallet, setWallet] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fetchedData = await fetchSats(wallet);
      // Extract only the first number from each sat array
      const satsArray = fetchedData.map(item => item.sat[0]);
      const satsString = satsArray.join(',');
      setSatCollection(prev => addSatsToCollection(satsString, prev, settings));
      setShow(false);
    } catch (error) {
      console.error('Error importing sats:', error);
    }
    setLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className="cyber-modal"
      centered
      size="md"
    >
      <Modal.Header className="modal-header-glow">
        <Modal.Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaExclamationTriangle
                  style={{
                    color: "#FFB300",
                    filter: "drop-shadow(0 0 10px #FF6F00)",
                    fontSize: "2rem",
                  }}
                />
                <span
                  style={{
                    color: "#FFB300",
                    filter: "drop-shadow(0 0 10px #FF6F00)",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  Experimental
                </span>
              </div>

        </Modal.Title>
        <button 
          onClick={() => setShow(false)} 
          className="close-add-sats-modal-button"
        >
          <FaTimes size={24} />
        </button>
      </Modal.Header>
      <Modal.Body className="modal-body-glow">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='mb-2'>
              <p>
                Import sats from <a href="https://sating.io/" target="_blank" rel="noopener noreferrer" style={{ color: "#C38BFA", textDecoration: 'none', "fontWeight": "bold" }}>sating.io</a>
              </p>
              <p>Clicking 'Submit' will send your wallet address to the sating.io API to retrieve your sat data and add it to your collection.</p>
            </Form.Label>
            <Form.Label>Enter wallet address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Wallet address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mt-4">
            <button type="submit" className="nav-button add-sats" disabled={loading}>
              {loading ? 'Importing...' : 'Submit'}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImportSatsModal;