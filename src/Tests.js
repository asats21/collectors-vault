import { getBlock, isUniformPalinception, isPerfectPalinception, isAlpha, isOmega, isUncommon, isBlackUncommon, 
getSubPaliLength, displayUniformPalinception, getUniformPalinceptionStructure, is450x } from './Helpers.js';
import { getRodarmorName, isRodarmorName } from './RodarmorNames.js';

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

  const testIsRodarmorName = () => {
    const testData = [
      { sat: 1846358422272101, expected: true },
      { sat: 6686728801179, expected: true },

      { sat: 398340909043893, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = isRodarmorName(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testGetSubPaliLength = () => {
    const testData = [
      { sat: 1950059119500591, expected: 8 },
      { sat: 78323877832387, expected: 7 },
      { sat: 891988919889198, expected: 5 },
      { sat: 1221122112211221, expected: 4 },
      { sat: 121565888565121, expected: 3 },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = getSubPaliLength(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testDisplayUniformPalinception = () => {
    const testData = [
      { sat: 1950059119500591, expected: "19500591-19500591" },
      { sat: 78323877832387, expected: "7832387-7832387" },
      { sat: 891988919889198, expected: "89198-89198-89198" },
      { sat: 1221122112211221, expected: "1221-1221-1221-1221" },
      { sat: 121565888565121, expected: "121-565-888-565-121" },

    ];

    return testData.map(({ sat, expected }, index) => {
      const result = displayUniformPalinception(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testGetUniformPalinceptionStructure = () => {
    const testData = [
      { sat: 1950059119500591, expected: "8-8" },
      { sat: 78323877832387, expected: "7-7" },
      { sat: 891988919889198, expected: "5-5-5" },
      { sat: 1221122112211221, expected: "4-4-4-4" },
      { sat: 121565888565121, expected: "3-3-3-3-3" },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = getUniformPalinceptionStructure(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testGetRodarmorName = () => {
    const testData = [
      { sat: 996607730538391, expected: "guesthouses" },
      { sat: 1811516515494097, expected: "backpacking" },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = getRodarmorName(sat);
      const passed = result === expected;

      return (
        <div key={index} style={{ color: passed ? 'green' : 'red' }}>
          <h4 style={{marginBottom: '0px'}}>{`Test ${index + 1}: ${passed ? 'Passed ✅' : 'Failed ❌'}`}</h4>
          {`Sat: ${sat} → Expected: ${expected}, Got: ${result}`}
        </div>
      );
    });
  };

  const testIs450x = () => {
    const testData = [
      { sat: 45080708054, expected: true },
      { sat: 45180708054, expected: false },
    ];

    return testData.map(({ sat, expected }, index) => {
      const result = is450x(sat);
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
      <h3>UniformPalinception Test</h3>
      <div>{testGetSubPaliLength()}</div>
      <div>{testDisplayUniformPalinception()}</div>
      <div>{testGetUniformPalinceptionStructure()}</div>
      <h3>Rodarmor Name Test</h3>
      <div>{testIsRodarmorName()}</div>
      <div>{testGetRodarmorName()}</div>
      <h3>450x Test</h3>
      <div>{testIs450x()}</div>
    </>
  );
};

export default Tests;