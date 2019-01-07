const express = require('express');

const bodyParser = require('body-parser');

const { logPostStatus } = require('./utils/pureFunctions');

const { postToCheckAnswer, getNewTaskAndAnswer } = require('./http/httpMethods');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('App listening on port', server.address().port);
});

/*
Please see the readme for potential issue with the API, to summarize multiplication
and addition can produce unsafe numbers, in which case if we add more to the result
prior to a POST, it will always return a 200 when the status code should be 400
*/

const startNewTaskAndValidate = () => {
  getNewTaskAndAnswer((answerCallback) => {
    console.log('... ... ... ... checking answer |');
    postToCheckAnswer(
      err => logPostStatus(err.status),
      res => logPostStatus(res.status),
      answerCallback,
    );
  });
};

setInterval(startNewTaskAndValidate, 5000);
