import React from 'react';
import { Modal } from 'react-bootstrap';

const ProfileSelectSatModal = ({
  show,
  onHide,
  searchText,
  setSearchText,
  searchResults,
  selectSat
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select a Sat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Type at least 2 characters..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchResults.length === 0 && searchText.length >= 2 && (
          <p className="text-muted">No results found.</p>
        )}
        {searchResults.map(([satId]) => (
          <div
            key={satId}
            className="p-2"
            style={{ cursor: 'pointer', borderBottom: '1px solid #444' }}
            onClick={() => selectSat(satId)}
          >
            {satId}
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default ProfileSelectSatModal;