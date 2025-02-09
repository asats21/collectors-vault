export const tagWeights = {
    palindrome: 5,
    sequence: 5,
    uniform_palinception: 40,
    perfect_palinception: 80,
    'uniform_3/5': 20,
    nova: 40,

    pizza: 40,
    jpeg: 60,
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
    
    tz_10: 60,
    tz_11: 80,
    tz_12: 100,
    tz_13: 120,
    tz_14: 140,
    tz_15: 200,
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