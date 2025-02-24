import React from 'react';
import achievementData from './achievements.json';
import {
  FaRocket, FaMedal, FaBinoculars, FaAward, FaCrown, FaHourglassHalf,
  FaFlag, FaRunning, FaDice, FaParking, FaGem,
  FaRegCalendarAlt, FaCalendarCheck, FaBirthdayCake, FaRegCalendar, FaLandmark, FaQuestion
} from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { TbAlpha, TbAlphabetLatin, TbAlphabetGreek } from "react-icons/tb";
import { GiWhaleTail, GiCalendar } from "react-icons/gi";

// Assuming you have `achievements` (array of completed achievement keys) passed in as props or from state
const Achievements = ({ achievements: completedKeys }) => {

  const iconMap = {
    FaRocket: FaRocket,
    FaMedal: FaMedal,
    FaBinoculars: FaBinoculars,
    FaAward: FaAward,
    FaCrown: FaCrown,
    FaHourglassHalf: FaHourglassHalf,
    FaFlag: FaFlag,
    FaRunning: FaRunning,
    FaDice: FaDice,
    FaParking: FaParking,
    FaGem: FaGem,
    FaRepeat: FaRepeat,
    FaRegCalendarAlt: FaRegCalendarAlt,
    FaCalendarCheck: FaCalendarCheck,
    FaBirthdayCake: FaBirthdayCake,
    FaRegCalendar: FaRegCalendar,
    FaLandmark: FaLandmark,
    TbAlpha: TbAlpha,
    TbAlphabetLatin: TbAlphabetLatin,
    TbAlphabetGreek: TbAlphabetGreek,
    GiWhaleTail: GiWhaleTail,
    GiCalendar: GiCalendar,
  };

  function getIconComponent(iconName) {
    return iconMap[iconName] || FaQuestion; // No JSX here
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