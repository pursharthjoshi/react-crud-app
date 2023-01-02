const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('./auth/local');
const jwtStrategy = require('./auth/jwt');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express(); // create express app

app.use(bodyParser.urlencoded({ limit: '200mb', extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(helmet()); // for security

app.use(cors()); // for cross-origin resource sharing
app.use(express.json()); // for parsing application/json
app.use(morgan('common')); // for logging requests
app.use(passport.initialize()); // for passport authentication

passport.use(localStrategy); // for local authentication
passport.use(jwtStrategy); // for jwt authentication

require('./routes')(app); // for routing

module.exports = app; // for exporting app for testing
