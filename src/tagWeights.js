export const tagWeights = {
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

export const sortSatsByWeight = (satCollection, tagWeights) => {
    return Object.entries(satCollection)
      .map(([sat, details]) => ({
        sat,
        details,
        weightSum: details.tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0),
      }))
      .sort((a, b) => {
        const weightDiff = b.weightSum - a.weightSum;
        if (weightDiff !== 0) return weightDiff;
        
        // If the weights are equal and both sats have the 'nova' tag, sort by year (descending)
        const aHasNova = a.details.tags.includes('nova');
        const bHasNova = b.details.tags.includes('nova');
        if (aHasNova && bHasNova) {
          return b.details.year - a.details.year;
        }
        
        return 0;
      });
};

export const getTotalWeight = (satCollection, tagWeights) => {
  return Object.entries(satCollection).reduce((totalWeight, [sat, details]) => {
    // Calculate the weight for the current SAT
    const satWeight = details.tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0);
    // Add the SAT's weight to the total weight
    return totalWeight + satWeight;
  }, 0); // Start with an initial value of 0
};

export const getWeightStats = (satCollection, tagWeights) => {
  let totalWeight = 0;
  let numberOfItems = 0;
  let heaviestSat = null;
  let maxWeight = -Infinity;

  // Iterate over the satCollection
  Object.entries(satCollection).forEach(([sat, details]) => {
    // Calculate the weight for the current SAT
    const satWeight = details.tags.reduce((sum, tag) => sum + (tagWeights[tag] || 0), 0);

    // Update total weight
    totalWeight += satWeight;

    // Update number of items
    numberOfItems += 1;

    // Track the heaviest SAT
    if (satWeight > maxWeight) {
      maxWeight = satWeight;
      heaviestSat = { sat, details, weight: satWeight };
    }
  });

  return {
    totalWeight, // Total weight of all SATs
    numberOfItems, // Number of SATs in the collection
    heaviestSat, // The heaviest SAT (object with sat, details, and weight)
  };
};