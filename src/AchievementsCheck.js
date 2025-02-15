import achievementData from './achievements.json';

/**
 * Checks the user's sat collection against each achievement's requirements.
 * Returns an array of keys for achievements that are achieved.
 * @param {Object} userSatCollection - The user's sat collection.
 * @returns {Array} Array of achievement keys that are achieved.
 */
export function checkAchievements(userSatCollection) {
  const achievedKeys = achievementData.filter((achievement) => {
    const reqArr = achievement.requirements;
    if (!reqArr || !Array.isArray(reqArr)) {
      return false;
    }
    return reqArr.every((req) => {
      // Check for total sats requirement.
      if (req.hasOwnProperty('total_sats')) {
        const totalSats = Object.keys(userSatCollection).length;
        return totalSats >= req.total_sats;
      }
      // Check for sat id that includes a specific substring.
      if (req.hasOwnProperty('sat_number_includes')) {
        return Object.keys(userSatCollection).some((satId) =>
          satId.includes(req.sat_number_includes)
        );
      }
      // Check for an epoch requirement.
      if (req.hasOwnProperty('epoch') && req.hasOwnProperty('count')) {
        let count = 0;
        for (const satId in userSatCollection) {
          const sat = userSatCollection[satId];
          if (sat.epoch === req.epoch) {
            count++;
          }
        }
        return count >= req.count;
      }
      // Check for a year requirement.
      if (req.hasOwnProperty('year') && req.hasOwnProperty('count')) {
        let count = 0;
        for (const satId in userSatCollection) {
          const sat = userSatCollection[satId];
          if (sat.year === req.year) {
            count++;
          }
        }
        return count >= req.count;
      }
      // Check for a tag-based requirement.
      if (req.hasOwnProperty('tags') && req.hasOwnProperty('count')) {
        const requiredTags = req.tags;
        let count = 0;
        for (const satId in userSatCollection) {
          const sat = userSatCollection[satId];
          if (requiredTags.every((tag) => sat.tags.includes(tag))) {
            count++;
          }
        }
        return count >= req.count;
      }
      // Unrecognized requirement: default to false.
      return false;
    });
  }).map((achievement) => achievement.key);

  return achievedKeys;
}