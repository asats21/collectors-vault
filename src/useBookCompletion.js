import { useEffect, useState } from 'react';

const useBookCompletion = (bookData, satCollection) => {
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    if (bookData) {
      // Step 1: Build the initial array of levels with their completion status
      const initialLevels = bookData.levels.map((level) => {
        const satsForLevel = Object.entries(satCollection)
          .filter(([sat, details]) => {
            const hasRequiredTags = level.requirements.every((req) =>
              req.tags.every((tag) => details.tags.includes(tag))
            );
            return hasRequiredTags;
          })
          .sort((a, b) => a[1].tags.length - b[1].tags.length); // Sort by the number of tags

        const selectedSat = satsForLevel.length > 0 ? satsForLevel[0][0] : null; // Pick the sat with the least tags

        const isComplete = satsForLevel.length >= level.requirements[0].count;

        return {
          level: level.name,
          isComplete,
          sat: selectedSat,
          requirements: level.requirements,
        };
      });

      // Step 2: Calculate the status for each level based on the initial array
      const newCompletedLevels = initialLevels.map((level, index) => {
        const isPreviousLevelComplete =
          index === 0 || initialLevels[index - 1].isComplete;

        let status;
        if (level.isComplete && isPreviousLevelComplete) {
          status = 'complete';
        } else if (level.isComplete && !isPreviousLevelComplete) {
          status = 'blocked';
        } else if (!level.isComplete && isPreviousLevelComplete) {
          // status = index === 0 ? 'next' : 'progress';
          status = 'next';
        } else {
          status = 'incomplete';
        }

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