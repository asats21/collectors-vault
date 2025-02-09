import { useEffect, useState } from 'react';

import { getBlock } from './TagDetection';

const useBookCompletion = (bookData, satCollection) => {
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    if (bookData) {

      const levels = bookData.levels.map((level) => {
        const satsForLevel = Object.entries(satCollection || {}) // Fallback to empty object
          .filter(([sat, details]) => {
            if (!details || !details.tags) return false; // Guard clause
        
            return level.requirements.every((req) => {
              const hasRequiredTags = req.tags.every((tag) => details.tags.includes(tag));
              const hasRequiredYears = req.years ? req.years.includes(details.year) : true;
              return hasRequiredTags && hasRequiredYears;
            });
          })
          .sort((a, b) => a[1].tags.length - b[1].tags.length);

        const selectedSat = satsForLevel.length > 0 ? satsForLevel[0][0] : null; // Pick the sat with the least tags

        const isComplete = satsForLevel.length >= level.requirements[0].count;

        return {
          level: level.name,
          description: level.description,
          status: isComplete ? 'complete' : 'incomplete',
          sat: selectedSat,
          block: getBlock(selectedSat),
          requirements: level.requirements,
        };
      });

      setCompletedLevels(levels);
    }
  }, [bookData, satCollection]);

  return completedLevels;
};

export default useBookCompletion;