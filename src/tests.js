import { isPalindrome, isPerfectPalinception, isUniformPalinception, getBlock } from './Helpers.js';
import { isPizza } from './Pizza.js';

function testGetBlock() {
  const testData = [
    { sat: 193639999999999, expectedBlock: 38727 },
    { sat: 45026237779, expectedBlock: 9 },
    { sat: 1738060000000000, expectedBlock: 550448 },
  ];

  let allTestsPassed = true;

  testData.forEach(({ sat, expectedBlock }) => {
    const result = getBlock(sat);
    if (result !== expectedBlock) {
      console.error(`Test failed for sat ${sat}: expected ${expectedBlock}, got ${result}`);
      allTestsPassed = false;
    } else {
      console.log(`Test passed for sat ${sat}`);
    }
  });

  if (allTestsPassed) {
    console.log("All tests passed!");
  } else {
    console.log("Some tests failed. Check the output above.");
  }
}

// Call the test function
testGetBlock();