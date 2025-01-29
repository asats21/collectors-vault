import { getBlock } from './Helpers.js';

const Tests = () => {
  const getBlockHeading = "GetBlock Tests";

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

  return (
    <>
      <h2>{getBlockHeading}</h2>
      <div>{testGetBlock()}</div>
    </>
  );
};

export default Tests;