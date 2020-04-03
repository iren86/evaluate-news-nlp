var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

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

function listening() {
    console.log(`running on localhost: ${port}`);
}

/**
 * Spin up the server
 */
app.listen(port, listening);

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});
