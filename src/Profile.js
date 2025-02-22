import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ProfileSelectSatModal from './ProfileSelectSatModal';
import { FaTimes } from 'react-icons/fa';

const Profile = ({ satCollection }) => {
  // Main show piece
  const [showPiece, setShowPiece] = useState(() => {
    const saved = localStorage.getItem('profile_showPiece');
    return saved ? JSON.parse(saved) : null;
  });

  // 10 sub pieces
  const [subPieces, setSubPieces] = useState(() => {
    const saved = localStorage.getItem('profile_subPieces');
    return saved ? JSON.parse(saved) : Array(10).fill(null);
  });

  useEffect(() => {
    localStorage.setItem('profile_showPiece', JSON.stringify(showPiece));
  }, [showPiece]);
  
  useEffect(() => {
    localStorage.setItem('profile_subPieces', JSON.stringify(subPieces));
  }, [subPieces]);

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
  
    // Delete handler: clear the selection for main (index === null) or a sub piece.
    const handleDelete = (e) => {
      e.stopPropagation(); // Prevent the modal from opening.
      if (index === null) {
        setShowPiece(null);
      } else {
        setSubPieces((prev) => {
          const newArr = [...prev];
          newArr[index] = null;
          return newArr;
        });
      }
    };
  
    return (
      <div
        key={index !== null ? index : 'main'}
        className="profile-sat"
        style={{
          width: '100%',
          height: isMain ? '300px' : '150px',
          marginBottom: isMain ? '1rem' : '0',
          cursor: 'pointer',
          position: 'relative',
          border: hasSat ? '2px solid #C38BFA' : '2px dashed #888',
          boxShadow: hasSat ? '0 0 10px #C38BFA' : '0 0 10px #888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => openModal(index)}
      >
        {hasSat ? (
          <>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{satId}</span>
            <div
              onClick={handleDelete}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                cursor: 'pointer',
                color: '#C38BFA',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}
            >
              <FaTimes />
            </div>
          </>
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