const express = require('express');

const bodyParser = require('body-parser');

const request = require('superagent');

const { getOperationResult, checkForUnsafeNumbers, logPostStatus } = require('./utils/pureFunctions');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('App listening on port', server.address().port);
});

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
        console.log('RES RES RES RES RES RES RES', res);
        const result = getOperationResult({ operation, left, right });
        console.log('the answer is:', result);
        checkForUnsafeNumbers(result);
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

const startNewTaskAndValidate = () => startNewTask((answerCallback) => {
  console.log('... ... ... ... checking answer |');
  checkAnswer(
    err => logPostStatus(err.status),
    res => logPostStatus(res.status),
    answerCallback,
  );
});

setInterval(startNewTaskAndValidate, 6500);
