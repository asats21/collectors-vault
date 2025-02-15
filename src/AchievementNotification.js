import React, { useEffect, useState } from 'react';
import achievementData from './achievements.json';

const AchievementNotification = ({ achievementKey, onNotificationComplete }) => {
  const [visible, setVisible] = useState(true);
  
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
  
  return (
    <div className="achievement-notification">
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