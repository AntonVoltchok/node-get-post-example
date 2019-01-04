const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const request = require('superagent');

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('App listening on port', server.address().port);
});

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
      return console.warn('MISSING / WRONG OPERATION PASSED IN');
  }
};


const startNewTask = (cb) => {
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
        /*
        Not necessarily an error with the api, but I noticed sometimes on
        multiplication and addition the result is too large and isn't a safe number
        */
        const maxSafeVal = 9007199254740992;
        if (result > maxSafeVal || result < -maxSafeVal) console.warn('WARNING RESULT IS NOT A SAFE NUMBER');
        cb({ id, result });
      }
    });
};

const checkAnswer = (errorCallback, cb, answer) => {
  request
    .post('https://interview.adpeai.com/api/v1/submit-task')
    .send(answer)
    .then(errorCallback, cb);
};

const logStatus = (status) => {
  switch (status) {
    case 200:
      return console.log(`status ${status} - success: the answer is correct`);
    case 400:
      return console.log(`status ${status} - wrong value/no ID specified/value is invalid`);
    case 500:
      return console.log(`status ${status} - ID cannot be found`);
    default:
      return console.warn('status is not 200/400/500', status);
  }
};

const startNewTaskAndValidate = () => startNewTask((obj) => {
  console.log('... ... ... ... checking answer |');
  checkAnswer(
    err => logStatus(err.status),
    res => logStatus(res.status),
    obj,
  );
});

setInterval(startNewTaskAndValidate, 6500);
