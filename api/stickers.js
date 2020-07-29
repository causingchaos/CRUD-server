const express = require('express');

const router = express.Router();

const queries = require('../db/queries.js');

// middleware, behaves just like a regular route and has a req, res, and next
// if it doesn't want to go onto the next thing, it can pass error
function isValidId(req,res,next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

router.get('/', (req,res) => {
  queries.getAll().then(stickers => {
    res.json(stickers);
  })
})

router.get('/:id', isValidId, (req,res) => {
  queries.getOne(req.params.id).then(sticker => {
    res.json(sticker);
  });
});

module.exports = router;