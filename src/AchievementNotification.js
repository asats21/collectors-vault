import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import achievementData from './achievements.json';

const AchievementNotification = ({ achievementKey, onNotificationComplete }) => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  
  // Find achievement details based on achievementKey
  const achievement = achievementData.find(ach => ach.key === achievementKey);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onNotificationComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNotificationComplete, achievementKey]);
  
  if (!visible || !achievement) return null;
  
  const handleClick = () => {
    setVisible(false);
    onNotificationComplete();
    navigate('/achievements');
  };

  return (
    <div className="achievement-notification" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="achievement-card">
        <div className="achievement-info">
          <h5 className="achievement-title">Achievement Unlocked!</h5>
          <p className="achievement-description">{achievement.name}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;