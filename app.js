var createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors');
var dotenv = require('dotenv').config(path.resolve(__dirname) + './.env');

var index = require('./routes/index.js');
var user = require('./routes/user.js');
const stickers = require('./api/stickers.js');  // import express router - route
var auth = require('./auth/index.js');

var authMiddleware = require("./auth/middleware.js");
const { response } = require('express');

var app = express();

//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  origin: 'http://localhost:8080',  // origin web server (client code)
  credentials: true     // enables Access-Control-Allow-Credentials (cross origin)
}));

app.use('/auth', auth);
// top level route for root of site
app.use('/',index);
// top level route for /users
app.use('/user', authMiddleware.ensureLoggedIn, user);
// top level route for stickers API, see /api/stickers for subroutes
app.use('/api/v1/stickers', stickers);

app.get('/set', (req,res) => {
  let key = 'token';
  let value = [...new Array(30)]
    .map((item) => ((Math.random() * 36) | 0).toString(36))
    .join('');
  
  console.log('Token',value);
  let thirtyDays = 1000 * 60 * 60 * 24 * 30; //30 days of miliseconds

  // req.headers.origin --> this will allow response to any browser
  res.set('Access-Control-Allow-Origin', req.headers.origin); // * wildcard not allows when sending creds
  res.set('Access-Control-Allow-Credentials','true');
  res.set('Access-Control-Expose-Headers','date, etag');
    
  res.cookie(key, value, {maxAge: thirtyDays, path: '/', sameSite: 'Lax'});


  res.send({message: 'set-cookie header send with maxAge of 30 days'});
});

app.get('/delete/:key', (req,res) => {
  //fetch call to delete a specific cookie
  console.log(req.params.key);
  let key = req.params.key;

  // req.headers.origin --> this will allow response to any browser
  res.set('Access-Control-Allow-Origin', req.headers.origin); // * wildcard not allows when sending creds
  res.set('Access-Control-Allow-Credentials','true');
  res.set('Access-Control-Expose-Headers','date, etag');

  res.cookie(key, '', {maxAge: 0, path: '/', sameSite: 'Lax'});
  res.send({
    message: `${key} cookie set to expire immediately`
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || res.statusCode || 500);

  //prevent error message in prod 
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
