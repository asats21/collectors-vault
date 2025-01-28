// satManagement.js
import {
    isPalindrome,
    isPerfectPalinception,
    isUniformPalinception,
    isAlpha,
    isOmega,
    getBlock,
    isUncommon,
    is3Digits,
    is2Digits,
    getSatYear,
    getEpoch
  } from './Helpers';
  import { isPizza } from './Pizza';
  import { isJpeg } from './Jpeg';
  import { isHitman } from './Hitman';
  
  /**
   * Adds new sats to the collection and tags them based on their properties.
   * @param {string} input - The input string containing sat numbers.
   * @param {Object} prevCollection - The current sat collection.
   * @returns {Object} - The updated sat collection.
   */
  export const addSatsToCollection = (input, prevCollection) => {
    const newSats = input
      .split(/\s*,\s*|\s+/) // Split by comma or whitespace
      .filter(Boolean); // Remove empty strings
  
    const updatedCollection = { ...prevCollection };
  
    newSats.forEach((sat) => {
      if(isNaN(sat))
        return;

      const satNumber = Number(sat); // Convert to number
      const blockNumber = getBlock(satNumber);
      const year = getSatYear(blockNumber);
      const epoch = getEpoch(blockNumber);
  
      if (updatedCollection[sat]) return; // Skip if sat already exists
  
      updatedCollection[sat] = {
        tags: [],
        block_number: blockNumber,
        year: year,
        epoch: epoch,
        price: null,
      };
  
      if (isPizza(satNumber)) {
        updatedCollection[sat].tags.push('pizza');

        if(blockNumber >= 52115 && blockNumber <= 52153) updatedCollection[sat].tags.push('420');
      }
  
      if (isJpeg(satNumber)) {
        updatedCollection[sat].tags.push('jpeg');
      }
      
      if (isHitman(satNumber)) {
        updatedCollection[sat].tags.push('hitman');
      }
  
      if (isPalindrome(satNumber)) {
        updatedCollection[sat].tags.push('palindrome');
  
        if (epoch > 0) updatedCollection[sat].tags.push('epoch1+');
        if (is3Digits(satNumber)) updatedCollection[sat].tags.push('3_digits');
        if (is2Digits(satNumber)) updatedCollection[sat].tags.push('2_digits');
      }
  
      if (isUniformPalinception(satNumber)) {
        updatedCollection[sat].tags.push('uniform');
      }
  
      if (isPerfectPalinception(satNumber)) {
        updatedCollection[sat].tags.push('perfect');
      }
  
      if (isPalindrome(blockNumber)) {
        updatedCollection[sat].tags.push('paliblock');
      }
  
      if (blockNumber < 1000) {
        updatedCollection[sat].tags.push('vintage');
      }
  
      if (isUncommon(satNumber)) {
        updatedCollection[sat].tags.push('uncommon');
        if (epoch === 0) updatedCollection[sat].tags.push('epoch0');
      }

      if (isUncommon(satNumber + 1)) {
        updatedCollection[sat].tags.push('black_uncommon');
        if (epoch === 0) updatedCollection[sat].tags.push('epoch0');
      }
  
      if (isAlpha(satNumber)) {
        updatedCollection[sat].tags.push('alpha');
      }
  
      if (isOmega(satNumber)) {
        updatedCollection[sat].tags.push('omega');
      }
  
      if (blockNumber === 9) {
        updatedCollection[sat].tags.push('block_9');
      }
  
      if (blockNumber === 78) {
        updatedCollection[sat].tags.push('block_78');
      }

      if (year === 2009) {
        updatedCollection[sat].tags.push('2009');
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