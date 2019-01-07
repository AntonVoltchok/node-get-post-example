const { getOperationResult, checkForUnsafeNumbers, logPostStatus } = require('../pureFunctions');

test('testing getOperationResult for all operations', () => {
  expect(getOperationResult({ operation: 'addition', left: 5, right: 10 })).toBe(15);
  expect(getOperationResult({ operation: 'subtraction', left: 10, right: 3 })).toBe(7);
  expect(getOperationResult({ operation: 'multiplication', left: 4, right: 5 })).toBe(20);
  expect(getOperationResult({ operation: 'division', left: 10, right: 2 })).toBe(5);
  expect(getOperationResult({ operation: 'remainder', left: 9, right: 8 })).toBe(1);
});

test('testing getOperationResult with incorrect operation', () => {
  jest.spyOn(global.console, 'warn');
  getOperationResult({ operation: 'abcdefg', left: 10, right: 20 });
  expect(console.warn).toHaveBeenCalled();
});

test('testing checkForUnsafeNumbers for positive and negative unsafe #s', () => {
  jest.spyOn(global.console, 'warn');
  const unsafeNumber = 9999999999999999;
  checkForUnsafeNumbers(unsafeNumber);
  expect(console.warn).toHaveBeenCalledWith('WARNING RESULT IS NOT A SAFE NUMBER');
  checkForUnsafeNumbers(-unsafeNumber);
  expect(console.warn).toHaveBeenCalledWith('WARNING RESULT IS NOT A SAFE NUMBER');
});

test('testing logPostStatus for 200, 400, 500, and unknown status', () => {
  jest.spyOn(global.console, 'log');
  logPostStatus(200);
  expect(console.log).toHaveBeenCalledWith('status 200 - success: the answer is correct');
  logPostStatus(400);
  expect(console.log).toHaveBeenCalledWith('status 400 - wrong value/no ID specified/value is invalid');
  logPostStatus(500);
  expect(console.log).toHaveBeenCalledWith('status 500 - ID cannot be found');

  jest.spyOn(global.console, 'warn');
  logPostStatus(9999);
  expect(console.warn).toHaveBeenCalledWith('status is not 200/400/500, received: 9999');
});
