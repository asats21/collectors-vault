// useBookCompletion.js
import { useEffect, useState } from 'react';

const useBookCompletion = (bookData, satCollection) => {
  const [completedLevels, setCompletedLevels] = useState([]);

  useEffect(() => {
    if (bookData) {
      const newCompletedLevels = bookData.levels.map((level) => {
        const satsForLevel = Object.entries(satCollection)
          .filter(([sat, details]) => {
            const hasRequiredTags = level.requirements.every((req) =>
              req.tags.every((tag) => details.tags.includes(tag))
            );
            return hasRequiredTags;
          })
          .sort((a, b) => a[1].tags.length - b[1].tags.length); // Sort by the number of tags

        const selectedSat = satsForLevel.length > 0 ? satsForLevel[0][0] : null; // Pick the sat with the least tags

        return {
          level: level.name,
          isComplete: satsForLevel.length >= level.requirements[0].count,
          sat: selectedSat,
          requirements: level.requirements, // Include the requirements for display
        };
      });

      setCompletedLevels(newCompletedLevels);
    }
  }, [bookData, satCollection]);

  return completedLevels;
};

export default useBookCompletion;