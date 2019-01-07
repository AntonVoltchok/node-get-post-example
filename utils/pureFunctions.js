const getOperationResult = ({ operation, left, right }) => {
  console.log(`operation: ${operation} 1st val ${left}, 2nd val ${right} `);
  switch (operation) {
    case 'addition':
      return left + right;
    case 'subtraction':
      return left - right;
    case 'multiplication':
      return left * right;
    case 'division':
      return left / right;
    case 'remainder':
      return left % right;
    default:
      return console.warn('UNIDENTIFIED / NO OPERATION PASSED IN');
  }
};

const checkForUnsafeNumbers = (result) => {
  const maxSafeVal = 9007199254740992;
  if (result > maxSafeVal || result < -maxSafeVal) console.warn('WARNING RESULT IS NOT A SAFE NUMBER');
};

const logPostStatus = (status) => {
  switch (status) {
    case 200:
      return console.log(`status ${status} - success: the answer is correct`);
    case 400:
      return console.log(`status ${status} - wrong value/no ID specified/value is invalid`);
    case 500:
      return console.log(`status ${status} - ID cannot be found`);
    default:
      return console.warn(`status is not 200/400/500, received: ${status}`);
  }
};

module.exports = {
  getOperationResult,
  checkForUnsafeNumbers,
  logPostStatus,
};
