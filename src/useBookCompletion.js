import { useEffect, useState } from 'react';

import { getBlock } from './Helpers';

const useBookCompletion = (bookData, satCollection) => {
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    if (bookData) {
      // Step 1: Build the initial array of levels with their completion status
      const initialLevels = bookData.levels.map((level) => {
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
          isComplete,
          sat: selectedSat,
          block: getBlock(selectedSat),
          requirements: level.requirements,
        };
      });

      // Step 2: Calculate the status for each level based on the initial array
      const newCompletedLevels = initialLevels.map((level, index) => {
        const status = level.isComplete ? 'complete' : 'incomplete';
        return {
          ...level,
          status,
        };
      });

      setCompletedLevels(newCompletedLevels);
    }
  }, [bookData, satCollection]);

  return completedLevels;
};

export default useBookCompletion;