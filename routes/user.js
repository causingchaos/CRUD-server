const express = require('express');
const router = express.Router();
const User = require('../db/user.js');
const Sticker = require('../db/sticker.js');

/*  API routes for user */

router.get('/', (req, res) => {
  User.getOne(req.params.id).then( user => {
    if (user) {
      res.json(user);
    }
  })
})

module.exports = router;