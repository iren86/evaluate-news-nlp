require('path');
const express = require('express');
const aylienTextAPI = require('aylien_textapi');
const dotenv = require('dotenv');
dotenv.config({path: './process.env'});

/**
 * Require Express to run server and routes
 */
const app = express();

/**
 * Dependencies
 */
const bodyParser = require('body-parser');

/**
 * Middleware
 * Here we are configuring express to use body-parser as middle-ware
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Cors for cross origin allowance
 */
const cors = require('cors');
app.use(cors());

/**
 * Initialize the main project folder
 */
app.use(express.static('dist'));

/**
 * Setup Server
 */
const port = 7000;

/**
 * Spin up the server
 */
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

/**
 * GET info from API
 */
function getInfo(request, response) {
  // Read API_ID and API_KEY from the environment
  const apiId = process.env.API_ID;
  const apiKey = process.env.API_KEY;

  const textapi = new aylienTextAPI({
    application_id: apiId,
    application_key: apiKey
  });
  console.log('query is', request.query.text);
  const sentiment = textapi.sentiment({
    'text': request.query.text,
  }, function(error, response) {
    if (error === null) {
      console.log(response);
    }
  });
  // console.log('Response from server is', response);
  console.log('Response code is', response.responseJson);
  console.log('sentiment is', JSON.stringify(sentiment));
  response.send(sentiment);
}

app.get('/info', getInfo);
