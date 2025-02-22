import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { RenderTags } from "./RenderTags";
import { renderRarity, displaySatNumber, renderYear } from "./Helpers";
import ProfileSelectSatModal from "./ProfileSelectSatModal";

const Profile = ({ satCollection }) => {
  const BASE_HEIGHT = 200; // Base height in pixels for sub-cards

  // Initialize showPiece and subPieces from localStorage
  const [showPiece, setShowPiece] = useState(() => {
    const saved = localStorage.getItem("profile_showPiece");
    return saved ? JSON.parse(saved) : null;
  });
  const [subPieces, setSubPieces] = useState(() => {
    const saved = localStorage.getItem("profile_subPieces");
    return saved ? JSON.parse(saved) : Array(8).fill(null);
  });

  // Modal state for sat selection
  const [showModal, setShowModal] = useState(false);
  // subIndex: null means selecting main show piece; 0..9 for sub pieces.
  const [subIndex, setSubIndex] = useState(null);

  // Search state for modal
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // For performance, memoize satEntries from satCollection
  const satEntries = useMemo(() => Object.entries(satCollection), [
    satCollection,
  ]);

  // For card transformations (tilt/enlargement)
  const cardRefs = useRef([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Persist selections to local storage
  useEffect(() => {
    localStorage.setItem("profile_showPiece", JSON.stringify(showPiece));
  }, [showPiece]);

  useEffect(() => {
    localStorage.setItem("profile_subPieces", JSON.stringify(subPieces));
  }, [subPieces]);

  // --- Transformation Functions (similar to ShowcaseBook) ---
  const updateTransform = (index, tiltX = 0, tiltY = 0, expIndex = expandedIndex) => {
    const card = cardRefs.current[index];
    if (card) {
      const scale = expIndex === index ? 1.5 : 1;
      card.style.transform = `
        perspective(1000px)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
        translateZ(10px)
        scale(${scale})
      `;
      card.style.zIndex = expIndex === index ? 8 : 1;
    }
  };

  const handleMouseMove = (index, e) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - x) * 30;
    const tiltY = (y - 0.5) * 20;
    updateTransform(index, tiltX, tiltY);
  };

  const handleMouseLeave = (index) => {
    updateTransform(index, 0, 0);
  };

  const toggleExpand = (index) => {
    const newExpandedIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newExpandedIndex);
    cardRefs.current.forEach((card, i) => {
      if (card) {
        updateTransform(i, 0, 0, newExpandedIndex);
      }
    });
  };

  const tagCounts = Object.values(satCollection).reduce((acc, { tags }) => {
    tags.forEach(tag => acc[tag] = (acc[tag] || 0) + 1);
    return acc;
  }, {});

  // --- Modal Search Logic ---
  const openModal = useCallback((index = null) => {
    setSubIndex(index);
    setSearchText("");
    setSearchResults([]);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSubIndex(null);
    setSearchText("");
    setSearchResults([]);
  }, []);

  const selectSat = useCallback(
    (satId) => {
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
    },
    [closeModal, subIndex]
  );

  useEffect(() => {
    if (!searchText || searchText.length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const lowerText = searchText.toLowerCase();
      const filtered = satEntries
        .filter(([satId]) => satId.toLowerCase().includes(lowerText))
        .slice(0, 8);
      setSearchResults(filtered);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, satEntries]);

  // --- Render a sat card ---
  const renderSatCard = (satId, isMain, index = null) => {
    const hasSat = Boolean(satId);
    return (
      <div
        key={index !== null ? index : "main"}
        style={{ height: isMain ? `${BASE_HEIGHT * 2 + 10}px` : `${BASE_HEIGHT}px` }} // 10px approximates 1rem
        ref={(el) => {
          if (index === null) {
            cardRefs.current[0] = el;
          } else {
            cardRefs.current[index] = el;
          }
        }}
        className={`profile-sat ${isMain ? "profile-sat--main" : "profile-sat--sub"} ${
          hasSat ? "profile-sat--selected" : "profile-sat--empty"
        }`}
        onClick={() => {
          if (hasSat) {
            toggleExpand(index);
          } else {
            openModal(index);
          }
        }}
        onMouseMove={hasSat ? (e) => handleMouseMove(index, e) : undefined}
        onMouseLeave={hasSat ? () => handleMouseLeave(index) : undefined}
      >
        {hasSat ? (() => {
          // Retrieve sat details using the satId key
          const satDetails = satCollection[satId];
          return (
            <>
              <div className="text-center">
                <div className="sat-year text-center fw-bold small">{ renderYear(satDetails) }</div>
                <div className="fw-bold" style={{color: "#C38BFA"}}>{displaySatNumber(satId)}</div>
                {satDetails && (
                  <div className="sat-tags ms-1 my-2">
                    <RenderTags tags={satDetails.tags || []} />
                  </div>
                )}
                { renderRarity(satDetails.tags || []) }
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (index === null) {
                    setShowPiece(null);
                  } else {
                    setSubPieces((prev) => {
                      const newArr = [...prev];
                      newArr[index] = null;
                      return newArr;
                    });
                  }
                  updateTransform(index, 0, 0, null);
                }}
                className="profile-delete-btn"
              >
                &#x2715;
              </div>
            </>
          );
        })() : (
          <span style={{ color: "#777" }}>???</span>
        )}
      </div>
    );
  };

  return (
    <div className="">

      {/* Header */}
      <div className="page-header mt-4 mt-md-2">
        <h1>Profile</h1>
      </div>

      <div className="row">
        {/* Left column for main show piece */}
        <div className="col-md-4" style={{ height: "calc(150px * 2 + 1rem)" }}>
          {renderSatCard(showPiece, true, null)}
        </div>
        {/* Right column for 8 sub pieces */}
        <div className="col-md-8">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {subPieces.map((satId, i) => renderSatCard(satId, false, i))}
          </div>
        </div>
      </div>
      {/* Statistics Section */}
      <div className="mt-4 profile-stats">
        <h3>Collection Stats</h3>
        <p>Total Sats: {Object.keys(satCollection).length}</p>
        <p>Uncommons: {tagCounts.uncommon || 0}</p>
        <p>Black uncommons: {tagCounts.black_uncommon || 0}</p>
        <p>Palindromes: {tagCounts.palindrome || 0}</p>
        <p>Uniform Palinceptions: {tagCounts.uniform_palinception || 0}</p>
        <p>Perfect Palinceptions: {tagCounts.perfect_palinception || 0}</p>
        <p>Nova Palindromes: {tagCounts.nova || 0}</p>
        <p>Rodarmor Names: {tagCounts.rodarmor_name || 0}</p>
        <p>Primes: {tagCounts.prime || 0}</p>
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
