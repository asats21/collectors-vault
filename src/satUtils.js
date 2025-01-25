// satUtils.js
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
  } from './Helpers';
  import { isPizza } from './Pizza';
  import { isJpeg } from './Jpeg';
  
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
      const satNumber = Number(sat); // Convert to number
      const blockNumber = getBlock(satNumber);
  
      if (updatedCollection[sat]) return; // Skip if sat already exists
  
      updatedCollection[sat] = {
        tags: [],
        block_number: blockNumber,
        year: getSatYear(blockNumber),
        price: null,
      };
  
      if (isPizza(satNumber)) {
        updatedCollection[sat].tags.push('pizza');
      }
  
      if (isJpeg(satNumber)) {
        updatedCollection[sat].tags.push('jpeg');
      }
  
      if (isPalindrome(satNumber)) {
        updatedCollection[sat].tags.push('palindrome');
  
        if (blockNumber >= 210000) updatedCollection[sat].tags.push('epoch1+');
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
      }
  
      if (isAlpha(satNumber)) {
        updatedCollection[sat].tags.push('alpha');
      }
  
      if (isOmega(satNumber)) {
        updatedCollection[sat].tags.push('omega');
      }
  
      if (blockNumber === 9) {
        updatedCollection[sat].tags.push('block 9');
      }
  
      if (blockNumber === 78) {
        updatedCollection[sat].tags.push('block 78');
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