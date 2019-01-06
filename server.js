const express = require('express');

const bodyParser = require('body-parser');

const { logPostStatus } = require('./utils/pureFunctions');

const { postToCheckAnswer, getNewTaskAndAnswer } = require('./http');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log('App listening on port', server.address().port);
});

const startNewTaskAndValidate = () => getNewTaskAndAnswer((answerCallback) => {
  console.log('... ... ... ... checking answer |');
  postToCheckAnswer(
    err => logPostStatus(err.status),
    res => logPostStatus(res.status),
    answerCallback,
  );
});

setInterval(startNewTaskAndValidate, 6500);
