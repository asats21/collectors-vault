import React from 'react';
import achievementData from './achievements.json';

const Achievements = ({ achievements }) => {

  return (
    <div className="container">
      <div className="page-header mt-4 mt-md-2 d-flex justify-content-between align-items-center">
        <h1>Achievements</h1>
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