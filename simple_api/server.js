const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const port = 3001;

const app = express();

app.use(bodyParser.json());
app.use('/api', api);

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return
  }

  console.log('Listening at http://localhost:' + port);
});
