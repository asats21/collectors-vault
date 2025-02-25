import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import achievementData from './achievements.json';

import {
  FaRocket, FaMedal, FaBinoculars, FaAward, FaCrown, FaHourglassHalf,
  FaFlag, FaRunning, FaDice, FaParking, FaGem,
  FaRegCalendarAlt, FaCalendarCheck, FaBirthdayCake, FaRegCalendar, FaLandmark, FaQuestion
} from "react-icons/fa";
import { FaRepeat, FaBluesky } from "react-icons/fa6";
import { TbAlpha, TbAlphabetLatin, TbAlphabetGreek } from "react-icons/tb";
import { GiWhaleTail, GiCalendar } from "react-icons/gi";

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
  FaBluesky: FaBluesky,
};

function getIconComponent(iconName) {
  return iconMap[iconName] || FaQuestion; // No JSX here
}

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

  const IconComponent = getIconComponent(achievement.icon);
  
  return (
    <div className="achievement-notification" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="achievement-card" style={{ display: 'flex', alignItems: 'center' }}>
        {IconComponent && <IconComponent size={40} style={{ marginRight: '10px' }} />}
        <div className="achievement-info">
          <h5 className="achievement-title">Achievement Unlocked!</h5>
          <p className="achievement-description">{achievement.name}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementNotification;