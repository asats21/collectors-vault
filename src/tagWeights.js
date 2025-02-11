const tagWeights = {
    palindrome: 5,
    sequence: 5,
    uniform_palinception: 40,
    perfect_palinception: 60,
    'uniform_3/5': 10,
    nova: 40,

    pizza: 40,
    jpeg: 120,
    hitman: 50,
    silkroad: 40,
    nakamoto: 100,

    '3_digits': 30,
    '2_digits': 120,
    'block_9': 50,
    'block_78': 40,
    'block_286': 30,
    '450x': 400,

    paliblock: 30,
    vintage: 20,
    rodarmor_name: 100,
    prime: 50,

    uncommon: 40,
    black_uncommon: 20,
    epoch0: 20,

    pali_uncommon: 80,
    pali_black_uncommon: 50,

    alpha: 40,
    omega: 30,

    '2009': 10,
    'pizza_2009': 50,
    'pizza_4/20': 30,
    'jpeg_2010': 50,
    
    tz_10: 10,
    tz_11: 40,
    tz_12: 80,
    tz_13: 140,
    tz_14: 200,
    tz_15: 300,
};

const bonusTagWeights = {
  // 'paliblock,pizza': 50,
  // 'uniform_palinception,jpeg': 50,
};

export const calculateSatWeight = (tags) => {
  // Calculate base weight from individual tags
  let weight = tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0);
  
  // Add bonuses for tag combinations
  Object.entries(bonusTagWeights).forEach(([tagPair, bonus]) => {
      const requiredTags = tagPair.split(',');
      if (requiredTags.every(tag => tags.includes(tag))) {
          weight += bonus;
      }
  });
  
  return weight;
};

export const sortSatsByWeight = (satCollection) => {
  return Object.entries(satCollection)
    .map(([sat, details]) => ({
      sat,
      details,
      weightSum: calculateSatWeight(details.tags, tagWeights, bonusTagWeights),
    }))
    .sort((a, b) => {
      const weightDiff = b.weightSum - a.weightSum;
      if (weightDiff !== 0) return weightDiff;
      
      // Existing sorting logic for 'nova' tags
      const aHasNova = a.details.tags.includes('nova');
      const bHasNova = b.details.tags.includes('nova');
      if (aHasNova && bHasNova) return b.details.year - a.details.year;
      return 0;
    });
};

export const getTotalWeight = (satCollection) => {
  return Object.entries(satCollection).reduce((total, [sat, details]) => {
    return total + calculateSatWeight(details.tags, tagWeights, bonusTagWeights);
  }, 0);
};

export const getWeightStats = (satCollection) => {
  let totalWeight = 0;
  let numberOfItems = 0;
  let heaviestSat = null;
  let maxWeight = -Infinity;

  Object.entries(satCollection).forEach(([sat, details]) => {
    const satWeight = calculateSatWeight(details.tags, tagWeights, bonusTagWeights);
    totalWeight += satWeight;
    numberOfItems += 1;

    if (satWeight > maxWeight) {
      maxWeight = satWeight;
      heaviestSat = { sat, details, weight: satWeight };
    }
  });

  return { totalWeight, numberOfItems, heaviestSat };
};

export const getAvailableTags = () => {
  return Object.keys(tagWeights);
}