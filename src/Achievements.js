import React from 'react';
import achievementData from './achievements.json';
import * as FaIcons from 'react-icons/fa'; // import all FontAwesome icons
import * as Fa6Icons from "react-icons/fa6";
import * as TbIcons from "react-icons/tb";
import * as GiIcons from 'react-icons/gi';

// Assuming you have `achievements` (array of completed achievement keys) passed in as props or from state
const Achievements = ({ achievements: completedKeys }) => {

  function getIconComponent(iconName) {
    let Icon = FaIcons[iconName];
    if (!Icon) {
      Icon = Fa6Icons[iconName];
    }
    if (!Icon) {
      Icon = TbIcons[iconName];
    }
    if (!Icon) {
      Icon = GiIcons[iconName];
    }
    // Fallback if icon is not found in either set
    if (!Icon) {
      Icon = FaIcons.FaQuestion; // or any default icon of your choice
    }
    return Icon;
  }

  return (
    <div className="container">
      <div className="page-header mt-4 mt-md-2 d-flex justify-content-between align-items-center">
        <h1>Achievements</h1>
      </div>

      <div className="row">
        {achievementData.map((ach) => {
          // Get the icon component from react-icons using the icon name stored in the JSON.
          const IconComponent = getIconComponent(ach.icon);
          return (
            <div key={ach.key} className="col-md-4 mb-4">
              <div className={`card ${completedKeys.includes(ach.key) ? "achievement-card-completed" : ""}`}>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    {IconComponent && <IconComponent size={30} />}
                    <h5 className="card-title ms-2">{ach.name}</h5>
                  </div>
                  <p className="card-text">{ach.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;