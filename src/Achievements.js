import React, { useState, useEffect } from 'react';
import achievementData from './achievements.json';
import { checkAchievements } from './AchievementsCheck';
import AchievementNotification from './AchievementNotification';

const Achievements = ({ satCollection }) => {
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
  
  // Persist achievements to local storage whenever they change.
  useEffect(() => {
    localStorage.setItem('completedAchievements', JSON.stringify(achievements));
  }, [achievements]);
  
  // Persist notifications to local storage whenever they change.
  useEffect(() => {
    localStorage.setItem('achievementNotifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const handleRefresh = () => {
    // Run detection logic: returns an array of achievement keys that are achieved.
    const newAchieved = checkAchievements(satCollection);
    
    // Determine new achievements (that weren't in our previous state)
    const newNotifs = newAchieved.filter(key => !achievements.includes(key));
    
    // Update our global achievements state and add new ones to the notifications queue.
    setAchievements(newAchieved);
    if (newNotifs.length > 0) {
      setNotifications(prev => [...prev, ...newNotifs]);
    }
  };

  return (
    <div className="container">
      <div className="page-header mt-4 mt-md-2 d-flex justify-content-between align-items-center">
        <h1>Achievements</h1>
        <button className="nav-button add-sats" onClick={handleRefresh}>
          Refresh Achievements
        </button>
      </div>
      
      <div className="row">
        {achievementData.map((ach) => (
          <div key={ach.key} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ach.name}</h5>
                <p className="card-text">{ach.description}</p>
                {achievements.includes(ach.key) ? (
                  <p className="card-text text-success">Completed</p>
                ) : (
                  <p className="card-text text-warning">Incomplete</p>
                )}
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default Achievements;