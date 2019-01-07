const request = require('superagent');

const { getOperationResult, checkForUnsafeNumbers } = require('../utils/pureFunctions');

const getNewTaskAndAnswer = (cb) => {
  console.log('| NEW TASK -------------------');
  request
    .get('https://interview.adpeai.com/api/v1/get-task')
    .end((err, res) => {
      if (err) {
        console.log(`${err.status} error in startNewTask GET`);
      } else {
        const {
          id, operation, left, right,
        } = res.body;
        const result = getOperationResult({ operation, left, right });
        console.log('the answer is:', result);
        checkForUnsafeNumbers(result);
        cb({ id, result });
      }
    });
};

const postToCheckAnswer = (errorCallback, cb, answer) => {
  request
    .post('https://interview.adpeai.com/api/v1/submit-task')
    .send(answer)
    .then(errorCallback, cb);
};

module.exports = { postToCheckAnswer, getNewTaskAndAnswer };
