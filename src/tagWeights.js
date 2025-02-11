export const tagWeights = {

    alpha: 5,
    omega: 5,

    uncommon: 40,
    black_uncommon: 20,

    pali_uncommon: 120,
    pali_black_uncommon: 60,

    palindrome: 5,
    sequence: 5,
    uniform_palinception: 40,
    perfect_palinception: 60,
    'uniform_3/5': 10,
  
    '3_digits': 30,
    '2_digits': 120,

    pizza: 40,
    jpeg: 160,
    hitman: 50,
    silkroad: 40,
    nakamoto: 160,

    'pizza_2009': 100,
    'pizza_4/20': 80,
    'jpeg_2010': 80,

    '450x': 400,
    'block_9': 200,
    'block_78': 160,
    'block_286': 100,
    
    paliblock: 40,
    rodarmor_name: 160,
    prime: 50,

    '2009': 10,
    epoch0: 20,
    vintage: 40,
    nova: 40,

    tz_10: 10,
    tz_11: 40,
    tz_12: 80,
    tz_13: 140,
    tz_14: 200,
    tz_15: 300,
};

export const bonusTagWeights = {
  // * Paliblock
  'paliblock,pizza': 100,
  'uncommon,paliblock': 100,
  'black_uncommon,paliblock': 80,
  // * Uniform Palinception
  'uniform_palinception,jpeg': 100,
  'uniform_palinception,pizza': 50,
  'uniform_palinception,2_digits': 50,
  // * Perfect Palinception
  'perfect_palinception,nova': 160,
  'perfect_palinception,2_digits': 100,
  'perfect_palinception,paliblock': 100,
  // * Uncommon
  'uncommon,jpeg': 500,
  'uncommon,pizza': 300,
  // * Black Uncommon
  'black_uncommon,jpeg': 300,
  'black_uncommon,pizza': 150,
  // * Alpha
  'alpha,jpeg': 200,
  'alpha,pizza': 80,
  'alpha,hitman': 100,
  'alpha,silkroad': 40,
  'alpha,nakamoto': 300,
  // * Omega
  'omega,jpeg': 100,
  'omega,pizza': 40,
  'omega,hitman': 50,
  'omega,silkroad': 20,
  // * 3D
  '3_digits,jpeg': 400,
  '3_digits,pizza': 200,
  '3_digits,nova': 60,
  // * 2D
  '2_digits,nova': 200,
  // * B78
  'block_78,alpha': 200,
  'block_78,3_digits': 100,
  'block_78,uniform_palinception': 60,
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