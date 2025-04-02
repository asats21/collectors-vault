import React, { useState, useEffect, useCallback } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './css/Settings.css';
import './css/Modal.css';
import './css/Achievements.css';
import './css/Profile.css';

import { Tooltip } from "bootstrap";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { loadSilkroadRanges } from './Silkroad';
import { checkAchievements } from './AchievementsCheck';
import { FaCog, FaUser } from 'react-icons/fa';

import DemoModeModal from './DemoModeModal';
import ChallengeBook from './ChallengeBook';  // Import your ChallengeBook component
import ChallengeBooksList from './ChallengeBooksList';  // Import the Challenge Books page
import ShowcaseBook from './ShowcaseBook';  // Import your ChallengeBook component
import ShowcaseBooksList from './ShowcaseBooksList';  // Import the Showcase Books page
import MySats from './MySats';  // Import the Index page
import Tests from './Tests';  // Import the Tests page
import About from './About';  // Import the About page
import Settings from './Settings';  // Import the Settings page
import Leaderboard from './Leaderboard';  // Import the Leaderboard page
import LeaderboardEntry from './LeaderboardEntry';  // Import the Leaderboard Entry page
import TagWeightsPage from './TagWeightsPage';
import Achievements from './Achievements';
import AchievementNotification from './AchievementNotification';
import Profile from './Profile';
import SatingTestApiPage from './sating/SatingTestApiPage';

function App() {

  const [satCollection, setSatCollection] = useState(() => {
    // Load from localStorage or initialize with an empty object
    const savedCollection = localStorage.getItem('satCollection');
    return savedCollection ? JSON.parse(savedCollection) : {};
  });

  // Global state for achieved achievement keys
  const [achievements, setAchievements] = useState(() => {
    const stored = localStorage.getItem('completedAchievements');
    return stored ? JSON.parse(stored) : [];
  });
  
  // Global state for notification queue (achievement keys not yet shown)
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem('achievementNotifications');
    return stored ? JSON.parse(stored) : [];
  });

  const [settings, setSettings] = useState(() => {
    // Get settings from localStorage if they exist, otherwise use default values
    const savedSettings = localStorage.getItem("scv_settings");
    return savedSettings ? JSON.parse(savedSettings) : { ignoreSilkroadRanges: true };
  });

  // Initialize showPiece and subPieces for the Profile Page from localStorage
  const [showPiece, setShowPiece] = useState(() => {
    const saved = localStorage.getItem("profile_showPiece");
    return saved ? JSON.parse(saved) : null;
  });

  const [subPieces, setSubPieces] = useState(() => {
    const saved = localStorage.getItem("profile_subPieces");
    return saved ? JSON.parse(saved) : Array(8).fill(null);
  });

  const refreshAchievements = useCallback((satCollection) => {
    setAchievements(prevAchievements => {
      const newAchieved = checkAchievements(satCollection);
      // New achievements are those not already in the previous achievements.
      const newNotifs = newAchieved.filter(key => !prevAchievements.includes(key));
      
      if (newNotifs.length > 0) {
        setNotifications(prev => {
          // Filter out keys already in notifications to prevent duplicates.
          const uniqueNew = newNotifs.filter(key => !prev.includes(key));
          return [...prev, ...uniqueNew];
        });
      }
      
      return newAchieved;
    });
  }, []);

  // Save satCollection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('satCollection', JSON.stringify(satCollection));
    refreshAchievements(satCollection);
  }, [satCollection, refreshAchievements]);

  // Persist achievements to local storage whenever they change.
  useEffect(() => {
    localStorage.setItem('completedAchievements', JSON.stringify(achievements));
  }, [achievements]);
  
  // Persist notifications to local storage whenever they change.
  useEffect(() => {
    localStorage.setItem('achievementNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scv_settings", JSON.stringify(settings));
  }, [settings]);

  // Load Silkroad ranges once
  useEffect(() => {
    if(!settings.ignoreSilkroadRanges) loadSilkroadRanges();
  }, [settings]);

  // Persist selections to local storage
  useEffect(() => {
    localStorage.setItem("profile_showPiece", JSON.stringify(showPiece));
  }, [showPiece]);

  // Persist selections to local storage
  useEffect(() => {
    localStorage.setItem("profile_subPieces", JSON.stringify(subPieces));
  }, [subPieces]);

  useEffect(() => {
    const initializeTooltips = () => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipEl) => {
            if (!Tooltip.getInstance(tooltipEl)) {
                new Tooltip(tooltipEl);
            }
        });
    };

    initializeTooltips(); // Initialize tooltips once

    const observer = new MutationObserver(initializeTooltips);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  function Navigation() {
    const location = useLocation();
    return (
      <nav>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <button className={`nav-button my-sats ${location.pathname === "/" ? "active" : ""}`}>My Sats</button>
          </Link>
          <Link to="showcase-books" style={{ textDecoration: 'none' }}>
            <button className={`nav-button showcase-books ${location.pathname === "/showcase-books" ? "active" : ""}`}>Showcase Books</button>
          </Link>
          <Link to="challenge-books" style={{ textDecoration: 'none' }}>
            <button className={`nav-button challenge-books ${location.pathname === "/challenge-books" ? "active" : ""}`}>Challenge Books</button>
          </Link>
        </div>
      </nav>
    );
  }

  function Footer() {
    return (
      <footer className="footer-nav text-center pt-4">
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          <Link to="about" style={{ textDecoration: 'none' }}>
            <button className="nav-button-footer about">
              About
            </button>
          </Link>
          <Link to="achievements" style={{ textDecoration: 'none' }}>
            <button className="nav-button-footer achievements">
              Achievements
            </button>
          </Link>
          <Link to="leaderboard" style={{ textDecoration: 'none' }}>
            <button className="nav-button-footer leaderboard">
              Leaderboard
            </button>
          </Link>
          <a href="https://asats21.github.io/rare-stats/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="nav-button-footer rarity">
              Rare Stats
            </button>
          </a>
          <a href="https://magisat.io/categories?_ref=alpha-sats" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="nav-button-footer about">
              Shop
            </button>
          </a>
        </div>
      </footer>
    );
  }

  function SettingsAndDemo({ satCollection }) {
    const [showDemoModal, setShowDemoModal] = useState(false);
  
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Demo Mode Button */}
        {satCollection && Object.keys(satCollection).length === 0 && (
          <button
            className="nav-button demo-mode mb-2 mb-md-0"
            onClick={() => setShowDemoModal(true)}
          >
            Demo Mode
          </button>
        )}
  
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: '10px' }}>
          <Link to="profile" className="profile-link">
            <div className="profile-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <FaUser size={24} style={{ cursor: 'pointer', color: "#ffffff" }} />
            </div>
          </Link>
          <Link to="settings" className="settings-link">
            <div className="settings-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <FaCog size={24} style={{ cursor: 'pointer', color: "#ffffff" }} />
            </div>
          </Link>
        </div>
  
        {/* Demo Mode Modal */}
        <DemoModeModal
          showModal={showDemoModal}
          setShowModal={setShowDemoModal}
          satCollection={satCollection}
          setSatCollection={setSatCollection}
        />
      </div>
    );
  }
  
  return (
    <Router>
      <div className="app-container">
        <div className="container">

          <div className='mt-3'>
            <SettingsAndDemo satCollection={satCollection} />
          </div>

          <h1 className="text-center mb-4">Sat Collector's Vault</h1>
          <Navigation />
          <Routes>
            <Route path="/" element={<MySats satCollection={satCollection} setSatCollection={setSatCollection} settings={settings} />} />
            <Route path="/challenge-books" element={<ChallengeBooksList satCollection={satCollection} />} />
            <Route path="/challenge-books/:bookKey" element={<ChallengeBook satCollection={satCollection} />} />
            <Route path="/showcase-books" element={<ShowcaseBooksList satCollection={satCollection} />} />
            <Route path="/showcase-books/:bookKey" element={<ShowcaseBook satCollection={satCollection} />} />
            <Route path="/settings" element={<Settings satCollection={satCollection} setSatCollection={setSatCollection} settings={settings} setSettings={setSettings} setShowPiece={setShowPiece} setSubPieces={setSubPieces} />} />
            <Route path="/about" element={<About />} />
            <Route path="/tag-weights" element={<TagWeightsPage />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/leaderboard" element={<Leaderboard satCollection={satCollection} />} />
            <Route path="/leaderboard/:address" element={<LeaderboardEntry />} />
            <Route path="/achievements" element={<Achievements achievements={achievements} />} />
            <Route path="/profile" element={<Profile satCollection={satCollection} showPiece={showPiece} setShowPiece={setShowPiece} subPieces={subPieces} setSubPieces={setSubPieces} />} />
            <Route path="/test-sating-api" element={<SatingTestApiPage />} />
          </Routes>
        </div>
        {/* Notification container: shows the first notification in the queue, if any */}
        <div className="notification-container">
          {notifications.length > 0 && (
            <AchievementNotification 
              key={notifications[0]} // Force re-mount when achievementKey changes
              achievementKey={notifications[0]} 
              onNotificationComplete={() => {
                setNotifications(prev => prev.slice(1));
              }}
            />
          )}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
