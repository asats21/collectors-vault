import React, { useState, useEffect } from 'react';

const palindromeBookData = {
  name: "Palindrome book",
  levels: [
    {
      name: "Level 1",
      requirements: [{ count: 1, tags: ['palindrome'] }]
    },
    {
      name: "Level 2",
      requirements: [{ count: 1, tags: ['palindrome', '3_digits'] }]
    },
    // Add more levels as needed
  ]
};

const PalindromeBook = ({ satCollection }) => {
  const [completedLevels, setCompletedLevels] = useState([]);

  // Check which levels are completed based on satCollection
  useEffect(() => {
    const newCompletedLevels = palindromeBookData.levels.map((level, index) => {
      const satsForLevel = Object.entries(satCollection).filter(([sat, details]) => {
        const hasRequiredTags = level.requirements.every(req => 
          req.tags.every(tag => details.tags.includes(tag))
        );
        return hasRequiredTags;
      });

      return {
        level: level.name,
        isComplete: satsForLevel.length >= level.requirements[0].count,
        sats: satsForLevel.map(([sat, _]) => sat)
      };
    });

    setCompletedLevels(newCompletedLevels);
  }, [satCollection]);

  return (
    <div>
      <h1>{palindromeBookData.name}</h1>
      <ul>
        {completedLevels.map((level, index) => (
          <li key={index}>
            <h3>{level.level}</h3>
            {level.isComplete ? (
              <>
                <p>Level complete!</p>
                <p>Sats: {level.sats.join(', ')}</p>
              </>
            ) : (
              <p>Level not complete yet</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PalindromeBook;