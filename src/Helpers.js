export function isPalindrome(num) {
    let str = num.toString();
    return str === str.split('').reverse().join('');
}

export function isSequence(sat_num) {
    // Convert the number to a string
    const str = sat_num.toString();
    
    // Use a regular expression to check for 3 or more repeating digits
    return /(\d)\1{2,}/.test(str);
}

export function isPerfectPalinception(num) {
    // Convert number to string
    const str = num.toString();

    // Check if the length of the number is divisible by any number of parts (from 2 up to the length of the number)
    const length = str.length;

    // Function to check if a substring is palindrome
    const isPalindrome = (s) => s === s.split('').reverse().join('');

    // Function to check if the string can be split into repeated palindrome parts
    const splitAndCheck = (parts) => {
        const partLength = length / parts;
        const firstPart = str.substring(0, partLength);
        if (!isPalindrome(firstPart)) return false;

        for (let i = 1; i < parts; i++) {
            const part = str.substring(i * partLength, (i + 1) * partLength);
            if (part !== firstPart || !isPalindrome(part)) {
                return false;
            }
        }
        return true;
    };

    // Check for repetitions of palindromes starting from 2 up to the length of the string
    for (let i = 2; i <= length; i++) {
        if (length % i === 0 && splitAndCheck(i)) {
            return true;
        }
    }

    return false;
}

export function isUniformPalinception(num) {
    let str = num.toString();
    let length = str.length;

    // The whole number must be a palindrome first
    if (!isPalindrome(str)) {
        return false;
    }

    // Try segment lengths of 3 to 8
    for (let len of [3, 4, 5, 6, 7, 8]) {
        if (length % len === 0) {
            let numSegments = length / len;
            let allPalindromes = true;

            for (let i = 0; i < numSegments; i++) {
                let segment = str.slice(i * len, (i + 1) * len);
                if (!isPalindrome(segment)) {
                    allPalindromes = false;
                    break;
                }
            }

            if (allPalindromes) {
                return true;
            }
        }
    }

    return false;
}

export function getSubPaliLength(num) {
    if (!isUniformPalinception(num)) {
        return null;
    }

    let str = num.toString();
    let length = str.length;

    for (let len of [3, 4, 5, 6, 7, 8]) {
        if (length % len === 0) {
            let numSegments = length / len;
            let allPalindromes = true;

            for (let i = 0; i < numSegments; i++) {
                let segment = str.slice(i * len, (i + 1) * len);
                if (!isPalindrome(segment)) {
                    allPalindromes = false;
                    break;
                }
            }

            if (allPalindromes) {
                return len; // Return the first valid sub-palindrome length
            }
        }
    }

    return null;
}

export function displayUniformPalinception(sat_num) {
    let subPaliLength = getSubPaliLength(sat_num);
    if (!subPaliLength) {
        return sat_num.toString(); // If not uniform, return as is
    }

    let str = sat_num.toString();
    let numSegments = str.length / subPaliLength;
    let segments = [];

    for (let i = 0; i < numSegments; i++) {
        segments.push(str.slice(i * subPaliLength, (i + 1) * subPaliLength));
    }

    return segments.join('-'); // Return formatted uniform palinception
}

export function getUniformPalinceptionStructure(sat_num) {
    const subPaliLength = getSubPaliLength(sat_num);
    if (!subPaliLength) return null;

    const numSegments = sat_num.toString().length / subPaliLength;
    return Array(numSegments).fill(subPaliLength).join('-');
}

export function getBlock(sat_num) {
    const BTC = 1e8; // Assuming BTC is 100 million satoshis (standard Bitcoin definition)
    const BLOCKS = 210000; // Number of blocks per halving epoch (standard for Bitcoin)
  
    let blockReward = 50; // Starting reward (50 BTC per block)
    let startSats = 0; // Starting sats for each halving epoch
    let totalBlocks = 0; // Total blocks across all halvings
    let epoch = 0; // Start from the first epoch
  
    while (true) {
      let epochSats = BLOCKS * blockReward * BTC;
  
      // If the sat number is within the current epoch range
      if (sat_num < startSats + epochSats) {
        let block = Math.floor((sat_num - startSats) / (blockReward * BTC));
        return totalBlocks + block; // Calculate block number in this epoch and add to total blocks
      }
  
      // If not, move to the next epoch
      startSats += epochSats;
      totalBlocks += BLOCKS;
      blockReward /= 2; // Halve the block reward for the next epoch
      epoch++;

      if(epoch > 64)
        break;
    }
  
    return 0; // If not found in any epoch (though should never reach here for valid sat_num)
}

export function isAlpha(sat_num) {
    return Number.isInteger(sat_num / 1e8);
}

export function isOmega(sat_num) {
    return Number.isInteger((sat_num + 1) / 1e8);
}

export function isUncommon(sat_num) {
    // Define the subsidy halving epochs and their starting satoshi values
    const epochs = [
        { start: 0, subsidy: 50e8 }, // Epoch 0
        { start: 1050000000000000, subsidy: 25e8 }, // Epoch 1
        { start: 1575000000000000, subsidy: 12.5e8 }, // Epoch 2
        { start: 1837500000000000, subsidy: 6.25e8 }, // Epoch 3
        { start: 1968750000000000, subsidy: 3.125e8 }, // Epoch 4
        { start: 2034375000000000, subsidy: 1.5625e8 }, // Epoch 5
        { start: 2067187500000000, subsidy: 0.78125e8 }, // Epoch 6
        { start: 2083593750000000, subsidy: 0.390625e8 }, // Epoch 7
        { start: 2091796875000000, subsidy: 0.1953125e8 }, // Epoch 8
        { start: 2095898437500000, subsidy: 0.09765625e8 }, // Epoch 9
      // Add more epochs if needed
    ];
  
    // Check if the satoshi falls on a subsidy boundary in any epoch
    return epochs.some(epoch => {
      if (sat_num >= epoch.start) {
        return (sat_num - epoch.start) % epoch.subsidy === 0;
      }
      return false;
    });
}

export function isBlackUncommon(sat_num) {
    return isUncommon(sat_num + 1);
}

export function isPalindromicUncommon(sat_num) {
    if (!isUncommon(sat_num)) return false;

    let trimmedNum = Number(sat_num.toString().replace(/0+$/, "")); // Remove trailing zeros & convert back to number

    return isPalindrome(trimmedNum);
}

export function isPalindromicBlackUncommon(sat_num) {
    if(!isBlackUncommon(sat_num)) return false;
        
    let trimmedNum = Number(sat_num.toString().replace(/9+$/, "")); // Remove trailing nines & convert back to number

    return isPalindrome(trimmedNum);
}

export function is3Digits(sat_num) {
    // Convert the number to a string, then a Set to get unique digits
    const uniqueDigits = new Set(String(sat_num));
    // Check if the size of the Set is exactly 3
    return uniqueDigits.size === 3;
}

export function is2Digits(sat_num) {
    // Convert the number to a string, then a Set to get unique digits
    const uniqueDigits = new Set(String(sat_num));
    // Check if the size of the Set is exactly 2
    return uniqueDigits.size === 2;
}

export function getSatYear(blockNum) {
    // Mapping of years to their first block numbers
    const yearData = {
      2025: 877268,
      2024: 823799,
      2023: 769810,
      2022: 716600,
      2021: 663920,
      2020: 610710,
      2019: 556471,
      2018: 501974,
      2017: 446045,
      2016: 391195,
      2015: 336883,
      2014: 278013,
      2013: 214571,
      2012: 160046,
      2011: 100425,
      2010: 32502,
      2009: 0, // Genesis Block
    };

    // Return null if the block number is outside the range
    if(blockNum > yearData[2025] + 52560) {
        return null;
    }
  
    // Sort years in descending order
    const sortedYears = Object.keys(yearData).sort((a, b) => b - a);
  
    for (let year of sortedYears) {
      if (blockNum >= yearData[year]) {
        return parseInt(year, 10);
      }
    }
  
    // Return null if the block number is outside the range
    return null;
}

/**
 * Calculates the epoch for a given block number.
 * Each epoch consists of 210,000 blocks, starting from block 0.
 * @param {number} blockNumber - The block number.
 * @returns {number} - The epoch number.
 */
export const getEpoch = (blockNumber) => {
    return Math.floor(blockNumber / 210000);
};

export const is450x = (sat_num) => {
    return sat_num >= 45000000000 && sat_num < 45100000000;
  };