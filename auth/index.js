const express = require('express');
const User = require('../db/user');
const router = express.Router();
const bcrypt = require('bcrypt');

// Routes are prepended with /auth for these routes

router.get('/', (req, res) => {
  res.json({
    message: ":lock"
  });
});
  //user can login to the app with valid email/password
  // users cannot login to the app with blank or missing email.
  //users cannot login to the app with a blank or incorrect password.
function validUser(user){
  const validEmail = typeof user.email == 'string' && 
                      user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && 
                      user.password.trim() != '' &&
                      user.password.trim().length > 6;                 
  return validEmail && validPassword;
}

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

router.post('/signup', async (req, res, next) => { //adding next for custom error

  if(validUser(req.body)){
    User.getOneByEmail(req.body.email).then( user => {
      // if user not found
      if(!user) {
        console.log('email is unique');
        //this is a unique email + hashpassword Store hash in your password DB.
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          const user = {
            email: req.body.email,
            password: hash,
            created_at: new Date(),
          }
          User.create(user).then( id => {
            console.log('trying to create the user')
            setUserIdCookie(req, res, id); // set cookie on response
            res.json({
              id,
              message: "User Created"
            });
          });
        });
      }else{
        resError(res, 500, "Email in use");
      }
    });
  } else {
    resError(res, 400, "Invalid user or password");
  }
});

/* Signin route 
  Find  the user by email address, hash the password that the user enters,
  Compare that to the hashed password in the DB, then set cookie.
*/

function setUserIdCookie(req, res, id) {
  const isSecure = req.app.get('env') != 'development'; // F if in dev
  //console.log(isSecure);
  // setting the 'set-cookie' header
  res.cookie('user_id',id, {
    httpOnly: true, 
    secure:  isSecure, // only true in production
    signed: true, // encrypt the cookie
  });
}

router.post('/login', async (req, res, next) => {
  if(validUser(req.body)) {
    // check to see if user in DB
    User.getOneByEmail(req.body.email).then(user => {
      console.log(req.body.password);
      console.log('user',user);
      if (user) {
        //compare password with hashed password (user.password = hashed)
        bcrypt.compare(req.body.password, user.password)
          .then((result) => {
            // if the password matched
            if (result){
              setUserIdCookie(req, res, user.id); // set cookie on response
              res.json({
                id: user.id,
                message: 'Logging in!'
              });
            } else {
              next(new Error('Invalid Login'));
            }
        });
      } else {
        next(new Error('Invalid Login'));
      }
    });
  } else {
    next(new Error("Invalid Login"));
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.json({
    message: 'logout'
  })
})

module.exports = router;