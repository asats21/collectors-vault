import { getBlock, isUniformPalinception, isPerfectPalinception, isAlpha, isOmega, isUncommon, isBlackUncommon } from './Helpers.js';

const Tests = () => {

  const testIsAlpha = () => {
    const testData = [
      { sat: 541574400000000, expected: true },
      { sat: 1412373000000000, expected: true },

      { sat: 73929400000, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isAlpha(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testIsOmega = () => {
    const testData = [
      { sat: 1177182999999999, expected: true },
      { sat: 322135399999999, expected: true },

      { sat: 7889299999, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isOmega(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testIsUncommon = () => {
    const testData = [
      { sat: 61325000000000, expected: true },
      { sat: 1965623125000000, expected: true },

      { sat: 541574400000000, expected: false },
      { sat: 73838499400000, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isUncommon(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };
  
  const testIsBlackUncommon = () => {
    const testData = [
      { sat: 84369999999999, expected: true },
      { sat: 1981070937499999, expected: true },

      { sat: 322135399999999, expected: false },
      { sat: 384575699999, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isBlackUncommon(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

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

  const testIsUniformPalinception = () => {
    const testData = [
      { sat: 454202636202454, expected: true },
      { sat: 746475898574647, expected: true },
      { sat: 1331833883381331, expected: true },

      { sat: 78323877832387, expected: true },
      { sat: 1444444114444441, expected: true },
      { sat: 531355313553135, expected: true },

      { sat: 398340909043893, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isUniformPalinception(sat);
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
      <h3>IsAlpha Test</h3>
      <div>{testIsAlpha()}</div>
      <h3>IsOmega Test</h3>
      <div>{testIsOmega()}</div>
      <h3>IsUncommon Test</h3>
      <div>{testIsUncommon()}</div>
      <h3>IsBlackUncommon Test</h3>
      <div>{testIsBlackUncommon()}</div>
      <h3>GetBlock Test</h3>
      <div>{testGetBlock()}</div>
      <h3>IsPerfectPalinception Test</h3>
      <div>{testIsPerfectPalinception()}</div>
      <h3>IsUniformPalinception Test</h3>
      <div>{testIsUniformPalinception()}</div>
    </>
  );
};

export default Tests;