import { getBlock, isPerfectPalinception } from './Helpers.js';

const Tests = () => {

  const testGetBlock = () => {
    const testData = [
      { sat: 193639999999999, expectedBlock: 38727 },
      { sat: 45026237779, expectedBlock: 9 },
      { sat: 1738060000000000, expectedBlock: 550448 },
    ];

    return testData.map(({ sat, expectedBlock }, index) => {
      const result = getBlock(sat);
      const passed = result === expectedBlock;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected Block: ${expectedBlock}, Got: ${result}`}
        </div>
      );
    });
  };

  const testIsPerfectPalinception = () => {
    const testData = [
      { sat: 78323877832387, expected: true },
      { sat: 1444444114444441, expected: true },
      { sat: 531355313553135, expected: true },

      { sat: 1331833883381331, expected: false },
      { sat: 318136767631813, expected: false },
      { sat: 662652525256266, expected: false },
      { sat: 45026237779, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isPerfectPalinception(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  return (
    <>
      <h3>GetBlock Test</h3>
      <div>{testGetBlock()}</div>
      <h3>IsPerfectPalinception Test</h3>
      <div>{testIsPerfectPalinception()}</div>
    </>
  );
};

export default Tests;