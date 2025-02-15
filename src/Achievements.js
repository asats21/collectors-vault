import React from 'react';
import achievementData from './achievements.json';
import { checkAchievements } from './AchievementsCheck';

const Achievements = ({ satCollection, achievements, setAchievements, notifications, setNotifications }) => {
  
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
    </div>
  );
};

export default Achievements;