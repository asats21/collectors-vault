import React, { useState, useEffect } from 'react';
import achievementData from './achievements.json';
import { checkAchievements } from './AchievementsCheck';

const Achievements = ({ satCollection }) => {
  // Initialize completedKeys from local storage
  const [completedKeys, setCompletedKeys] = useState(() => {
    const stored = localStorage.getItem('completedAchievements');
    return stored ? JSON.parse(stored) : [];
  });

  // Write to local storage whenever completedKeys changes.
  useEffect(() => {
    localStorage.setItem('completedAchievements', JSON.stringify(completedKeys));
  }, [completedKeys]);

  // Refresh button handler: run detection logic with the provided satCollection.
  const handleRefresh = () => {
    const achieved = checkAchievements(satCollection);
    setCompletedKeys(achieved);
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
                {completedKeys.includes(ach.key) ? (
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
