import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { RenderTags } from "./RenderTags";
import { renderRarity, displaySatNumber, renderYear, renderBlockNumber } from "./Helpers";
import ProfileSelectSatModal from "./ProfileSelectSatModal";
import ProfileStats from "./ProfileStats";

const Profile = ({ satCollection, showPiece, setShowPiece, subPieces, setSubPieces }) => {
  const BASE_HEIGHT = 200; // Base height in pixels for sub-cards

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
    [closeModal, subIndex, setShowPiece, setSubPieces]
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
    const hasSat = satId && Object.keys(satId).length > 0;
    return (
      <div
        key={index !== null ? index : "main"}
        style={{ height: isMain ? `${BASE_HEIGHT * 2 + 16}px` : `${BASE_HEIGHT}px` }} // 10px approximates 1rem
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
                <div className="fw-bold profile-main-sat-number" style={{color: "#C38BFA"}}>{displaySatNumber(satId)}</div>
                {isMain &&
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    { renderBlockNumber(satDetails) }
                  </span>
                }
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

      <div className="row g-3">
        {/* Main show piece */}
        <div className="col-md-4 col-12">
          {renderSatCard(showPiece, true, null)}
        </div>
        {/* Sub pieces - hidden on mobile, 4 columns on desktop */}
        <div className="col-md-8 d-none d-md-block">
          <div
            className="row row-cols-1 row-cols-md-4 g-3" // Enforces 4 columns on md and up, 1 on mobile (hidden anyway)
          >
            {subPieces.map((satId, i) => (
              <div key={i} className="col">
                {renderSatCard(satId, false, i)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-block d-md-none my-3">
        <p className="mobile-showcase-text">
          More showcase sat slots available on desktop
        </p>
      </div>

      {/* Statistics Section */}
      <ProfileStats satCollection={satCollection} />

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
