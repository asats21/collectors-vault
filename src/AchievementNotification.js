import React, { useEffect, useState } from 'react';

const AchievementNotification = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Auto-hide the notification after 5 seconds
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="achievement-notification">
      <div className="achievement-card">
        <img
          src="path/to/achievement_icon.png"
          alt="Achievement Icon"
          className="achievement-icon"
        />
        <div className="achievement-info">
          <h5 className="achievement-title">Achievement Unlocked!</h5>
          <p className="achievement-description">Getting Started</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;