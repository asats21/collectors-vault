import achievementData from './achievements.json';

/**
 * Checks the user's sat collection against each achievement's requirements.
 * @param {Object} userSatCollection - The user's sat collection.
 * @returns {Array} Updated array of achievements with a "completed" flag.
 */
export function checkAchievements(userSatCollection) {
  const updatedAchievements = achievementData.map((achievement) => {
    let completed = false;
    const req = achievement.requirements;

    if (!req) {
      completed = false;
    }
    // If the requirement is an array, every sub-requirement must be met.
    else if (Array.isArray(req)) {
      completed = req.every((r) => {
        // Example: { epoch: 0, count: 1 }
        if (r.hasOwnProperty('epoch') && r.hasOwnProperty('count')) {
          let count = 0;
          for (const satId in userSatCollection) {
            const sat = userSatCollection[satId];
            if (sat.epoch === r.epoch) {
              count++;
            }
          }
          return count >= r.count;
        }
        // Add additional array-based requirement checks as needed.
        return false;
      });
    }
    // If the requirement is an object
    else if (typeof req === 'object') {
      // Check for total sats requirement.
      if (req.hasOwnProperty('total_sats')) {
        const totalSats = Object.keys(userSatCollection).length;
        completed = totalSats >= req.total_sats;
      }
      // Check for a sat id that includes a specific substring.
      else if (req.hasOwnProperty('sat_number_includes')) {
        completed = Object.keys(userSatCollection).some((satId) =>
          satId.includes(req.sat_number_includes)
        );
      }
      // Check for a requirement based on tags.
      else if (req.hasOwnProperty('tags') && req.hasOwnProperty('count')) {
        const requiredTags = req.tags;
        let count = 0;
        for (const satId in userSatCollection) {
          const sat = userSatCollection[satId];
          // Verify that the sat's tags include every required tag.
          if (requiredTags.every((tag) => sat.tags.includes(tag))) {
            count++;
          }
        }
        completed = count >= req.count;
      }
    }

    return { ...achievement, completed };
  });

  return updatedAchievements;
}