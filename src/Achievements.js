import React, { useState } from 'react';
import { checkAchievements } from './AchievementsCheck';

const Achievements = ({ satCollection }) => {
    const [achievements, setAchievements] = useState([]);
    const [lastScan, setLastScan] = useState(null);
  
    // Refresh button handler: uses the passed-in satCollection
    const handleRefresh = () => {
      const updatedAchievements = checkAchievements(satCollection);
      setAchievements(updatedAchievements);
      setLastScan(new Date().toLocaleString());
    };
  
    return (
      <div className="container">
        <div className="page-header mt-4 mt-md-2 d-flex justify-content-between align-items-center">
          <h1>Achievements</h1>
          <button className="nav-button add-sats" onClick={handleRefresh}>
            Refresh Achievements
          </button>
        </div>
  
        {lastScan && (
          <div className="mb-3">
            <small>Last scan: {lastScan}</small>
          </div>
        )}
  
        <div className="row">
          {achievements.map((ach) => (
            <div key={ach.key} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ach.name}</h5>
                  <p className="card-text">{ach.description}</p>
                  {ach.completed ? (
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