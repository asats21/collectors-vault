import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ProfileSelectSatModal from './ProfileSelectSatModal';

const Profile = ({ satCollection }) => {
  // Main show piece (sat id or null)
  const [showPiece, setShowPiece] = useState(null);
  // Array of 10 sub piece sat ids (or null for placeholders)
  const [subPieces, setSubPieces] = useState(Array(10).fill(null));

  // Modal state for selecting a sat
  const [showModal, setShowModal] = useState(false);
  // subIndex: null means selecting main show piece; 0-9 for sub pieces.
  const [subIndex, setSubIndex] = useState(null);

  // Search state for modal
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Convert satCollection to an array once
  const satEntries = useMemo(() => Object.entries(satCollection), [satCollection]);

  // Open the selection modal
  const openModal = (index = null) => {
    setSubIndex(index);
    setSearchText('');
    setSearchResults([]);
    setShowModal(true);
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSubIndex(null);
    setSearchText('');
    setSearchResults([]);
  }, []);

  // When user selects a sat from search results
  const selectSat = useCallback((satId) => {
    if (subIndex === null) {
      setShowPiece(satId);
    } else {
      setSubPieces(prev => {
        const newArr = [...prev];
        newArr[subIndex] = satId;
        return newArr;
      });
    }
    closeModal();
  }, [closeModal, subIndex]);

  // Debounced search effect
  useEffect(() => {
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

  // Render a sat card that mimics the ShowcaseBook card style
  const renderSatCard = (satId, isMain, index = null) => {
    const hasSat = Boolean(satId);
    return (
      <div
        key={index !== null ? index : 'main'}
        className="sat-card"
        style={{
          padding: '1rem',
          cursor: 'pointer',
          height: isMain ? '300px' : '150px',
          border: hasSat ? '2px solid #C38BFA' : '2px dashed #888',
          boxShadow: hasSat ? '0 0 10px #C38BFA' : '0 0 10px #888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => openModal(index)}
      >
        {hasSat ? (
          <span style={{ color: 'white', fontWeight: 'bold' }}>{satId}</span>
        ) : (
          <span style={{ color: '#777' }}>???</span>
        )}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left column: Main show piece */}
        <div className="col-md-4">
          {renderSatCard(showPiece, true, null)}
        </div>

        {/* Right column: 10 sub pieces in 2 rows */}
        <div className="col-md-8">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1rem'
          }}>
            {subPieces.map((satId, i) => renderSatCard(satId, false, i))}
          </div>
        </div>
      </div>

      {/* Statistics Section (placeholder) */}
      <div className="mt-4">
        <h2>Collection Stats</h2>
        <p>Total Sats: {Object.keys(satCollection).length}</p>
        {/* Additional stats can be added here */}
      </div>

      {/* Modal for selecting a sat */}
      <ProfileSelectSatModal
        show={showModal}
        onHide={closeModal}
        searchText={searchText}
        setSearchText={setSearchText}
        searchResults={searchResults}
        selectSat={selectSat}
      />
    </div>
  );
};

export default Profile;