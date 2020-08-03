var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index.js');
var user = require('./routes/user.js');
const stickers = require('./api/stickers.js');  // import express router - route

var app = express();

//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// top level route for root of site
app.use('/',index);
// top level route for /users
app.use('/user', user);
// top level route for stickers API, see /api/stickers for subroutes
app.use('/api/v1/stickers', stickers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
