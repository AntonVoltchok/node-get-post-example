const { getOperationResult, checkForUnsafeNumbers } = require('./../../utils/pureFunctions');

const mockData = {
  body: {
    id: 'a1b2c3d4e5',
    operation: 'multiplication',
    left: 3,
    right: 5,
  },
};

const getNewTaskAndAnswer = (cb) => {
  // Assuming the API has it's own tests, only returning a mock of the request data
  const mockFetchedData = (err, res) => {
    if (err) {
      console.log(`${err.status} error in startNewTask GET`);
    } else {
      const {
        id, operation, left, right,
      } = res.body;
      const result = getOperationResult({ operation, left, right });
      checkForUnsafeNumbers(result);
      cb({ id, result });
    }
  };
  mockFetchedData(null, mockData);
};

test('Testing getNewTaskAndAnswer to make sure callback returns correct object', () => {
  getNewTaskAndAnswer((cb) => {
    expect(cb).toEqual({ id: 'a1b2c3d4e5', result: 15 });
  });
});

/*
The postToCheckAnswer function strictly makes a POST request, again,
assuming the API has tests, I skipped mocking the post method
since we're testing if the post is given the correct object already
*/
