// satManagement.js
import {
    isPalindrome,
    isSequence,
    isPerfectPalinception,
    isUniformPalinception,
    isPaliblock,
    isAlpha,
    isOmega,
    getBlock,
    isUncommon,
    isBlackUncommon,
    isPalindromicUncommon,
    isPalindromicBlackUncommon,
    is3Digits,
    is2Digits,
    getSatYear,
    getEpoch,
    getUniformPalinceptionStructure,
    is450x,
    isNakamoto,
    isPrime,
    isThreeFivePalinception,
    getTrailingZeroes
  } from './TagDetection';
  import { isPizza } from './Pizza';
  import { isJpeg } from './Jpeg';
  import { isHitman } from './Hitman';
  import { isRodarmorName } from './RodarmorNames.js';
  import { isSilkroad } from './Silkroad.js';
  
  /**
   * Adds new sats to the collection and tags them based on their properties.
   * @param {string} input - The input string containing sat numbers.
   * @param {Object} prevCollection - The current sat collection.
   * @returns {Object} - The updated sat collection.
   */
  export const addSatsToCollection = (input, prevCollection, settings) => {
    const newSats = input
      .split(/\s*,\s*|\s+/) // Split by comma or whitespace
      .filter(Boolean); // Remove empty strings
  
    const updatedCollection = { ...prevCollection };
  
    newSats.forEach((sat) => {
      if(isNaN(sat))
        return;

      const satNumber = Number(sat); // Convert to number
      
      if(satNumber < 45000000000) return; 

      const blockNumber = getBlock(satNumber);
      const year = getSatYear(blockNumber);
      const epoch = getEpoch(blockNumber);
  
      // Always reset or create a new entry
      updatedCollection[sat] = {
        tags: [],
        block_number: blockNumber,
        year: year,
        epoch: epoch
      };

      if(!settings.ignoreSilkroadRanges) {
        if (isSilkroad(sat)) updatedCollection[sat].tags.push('silkroad');
      }
  
      if (isPizza(satNumber)) {
        updatedCollection[sat].tags.push('pizza');

        if(blockNumber >= 52115 && blockNumber <= 52153) updatedCollection[sat].tags.push('pizza_4/20');
        if (year === 2009) updatedCollection[sat].tags.push('pizza_2009');
      }
  
      if (isJpeg(satNumber)) {
        updatedCollection[sat].tags.push('jpeg');
        if (year === 2010) updatedCollection[sat].tags.push('jpeg_2010');
      }
      
      if (isHitman(satNumber)) {
        updatedCollection[sat].tags.push('hitman');
      }
  
      if (isPalindrome(satNumber)) {
        updatedCollection[sat].tags.push('palindrome');
  
        if (epoch > 0) updatedCollection[sat].tags.push('nova');
        if (is3Digits(satNumber)) updatedCollection[sat].tags.push('3_digits');
        if (is2Digits(satNumber)) updatedCollection[sat].tags.push('2_digits');
        if (isSequence(satNumber)) updatedCollection[sat].tags.push('sequence');
      }
  
      if (isUniformPalinception(satNumber)) {
        updatedCollection[sat].tags.push('uniform_palinception');
        updatedCollection[sat].tags.push(getUniformPalinceptionStructure(satNumber));
        if(isThreeFivePalinception(satNumber)) { 
          updatedCollection[sat].tags.push('5-5-5');
          updatedCollection[sat].tags.push('uniform_3/5');
        };
      }
  
      if (isPerfectPalinception(satNumber)) {
        updatedCollection[sat].tags.push('perfect_palinception');
      }
  
      if (isPaliblock(blockNumber)) {
        updatedCollection[sat].tags.push('paliblock');
      }
  
      if (blockNumber < 1000) {
        updatedCollection[sat].tags.push('vintage');
      }
  
      if (isUncommon(satNumber)) {
        updatedCollection[sat].tags.push('uncommon');
        if (epoch === 0) updatedCollection[sat].tags.push('epoch0');
        if (isPalindromicUncommon(satNumber)) updatedCollection[sat].tags.push('pali_uncommon');

        const trailingZeroes = getTrailingZeroes(satNumber);
        if(trailingZeroes >= 10) updatedCollection[sat].tags.push(`tz_${trailingZeroes}`);
      }

      if (isBlackUncommon(satNumber)) {
        updatedCollection[sat].tags.push('black_uncommon');
        if (epoch === 0) updatedCollection[sat].tags.push('epoch0');
        if (isPalindromicBlackUncommon(satNumber)) updatedCollection[sat].tags.push('pali_black_uncommon');
      }
  
      if (isAlpha(satNumber)) {
        updatedCollection[sat].tags.push('alpha');
      }
  
      if (isOmega(satNumber)) {
        updatedCollection[sat].tags.push('omega');
      }
  
      if (blockNumber === 9) {
        updatedCollection[sat].tags.push('block_9');
        if(is450x(satNumber)) updatedCollection[sat].tags.push('450x');
      }
  
      if (blockNumber === 78) {
        updatedCollection[sat].tags.push('block_78');
      }

      if (blockNumber === 286) {
        updatedCollection[sat].tags.push('block_286');
      }

      if (year === 2009) {
        updatedCollection[sat].tags.push('2009');
      }

      if (isRodarmorName(satNumber)) {
        updatedCollection[sat].tags.push('rodarmor_name');
      }

      if (isNakamoto(blockNumber)) {
        updatedCollection[sat].tags.push('nakamoto');
      }

      if (isPrime(satNumber)) {
        updatedCollection[sat].tags.push('prime');
      }

      // This way, any sat that ends up with no tags won't be added to the collection. 
      if (updatedCollection[sat].tags.length === 0) {
        delete updatedCollection[sat];
      }

    });
  
    return updatedCollection;
};

/**
 * Deletes a sat from the collection.
 * @param {string} sat - The sat number to delete.
 * @param {Object} prevCollection - The current sat collection.
 * @returns {Object} - The updated sat collection.
 */
export const deleteSatFromCollection = (sat, prevCollection) => {
  const updatedCollection = { ...prevCollection };
  delete updatedCollection[sat];
  return updatedCollection;
};