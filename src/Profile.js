import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal } from 'react-bootstrap';

const Profile = ({ satCollection }) => {
  // Main show piece
  const [showPiece, setShowPiece] = useState(null);

  // 10 sub pieces
  const [subPieces, setSubPieces] = useState(Array(10).fill(null));

  // Modal state
  const [showModal, setShowModal] = useState(false);

  // Whether we are setting main piece (subIndex=null) or a sub piece (0..9)
  const [subIndex, setSubIndex] = useState(null);

  // Search state
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Convert satCollection to array once, then memoize
  const satEntries = useMemo(() => {
    return Object.entries(satCollection);
  }, [satCollection]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSubIndex(null);
    setSearchText('');
    setSearchResults([]);
  }, []);

  const openModal = useCallback((index = null) => {
    setSubIndex(index);
    setSearchText('');
    setSearchResults([]);
    setShowModal(true);
  }, []);

  // Called when user clicks on a search result
  const selectSat = useCallback((satId) => {
    if (subIndex === null) {
      setShowPiece(satId);
    } else {
      setSubPieces((prev) => {
        const newArr = [...prev];
        newArr[subIndex] = satId;
        return newArr;
      });
    }
    closeModal();
  }, [closeModal, subIndex]);

  useEffect(() => {
    // If searchText is empty or less than 2 characters, clear results.
    if (!searchText || searchText.length < 2) {
      setSearchResults([]);
      return;
    }
  
    const timer = setTimeout(() => {
      const lowerText = searchText.toLowerCase();
      const filtered = satEntries
        .filter(([satId]) => satId.toLowerCase().includes(lowerText))
        .slice(0, 10);
      setSearchResults(filtered);
    }, 300);
  
    return () => clearTimeout(timer);
  }, [searchText, satEntries]);

  // Renders a sat card or placeholder
  const renderSatCard = (satId, isMain, index = null) => {
    const hasSat = !!satId;
    return (
      <div
        key={index !== null ? index : 'main'}
        className="d-flex align-items-center justify-content-center"
        style={{
          width: '100%',
          height: isMain ? '300px' : '150px',
          border: `2px ${hasSat ? 'solid' : 'dashed'} gray`,
          marginBottom: isMain ? '1rem' : '0',
          cursor: 'pointer'
        }}
        onClick={() => openModal(index)}
      >
        {hasSat ? (
          <span style={{ color: 'white' }}>{satId}</span>
        ) : (
          <span style={{ color: '#777' }}>???</span>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left column for main piece */}
        <div className="col-md-4">
          {renderSatCard(showPiece, true, null)}
        </div>

        {/* Right column for sub pieces */}
        <div className="col-md-8">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '1rem'
            }}
          >
            {subPieces.map((satId, i) => renderSatCard(satId, false, i))}
          </div>
        </div>
      </div>

      {/* Stats section placeholder */}
      <div className="mt-4">
        <h2>Collection Stats</h2>
        <p>Total Sats: {Object.keys(satCollection).length}</p>
      </div>

      {/* Modal for selecting a sat */}
      <Modal show={showModal} onHide={closeModal} centered>
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
    </div>
  );
};

export default Profile;