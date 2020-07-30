const express = require('express');

const router = express.Router();

const queries = require('../db/queries.js');

// middleware, behaves just like a regular route and has a req, res, and next
// if it doesn't want to go onto the next thing, it can pass error
function isValidId(req,res,next) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validSticker(sticker){
  // trim() --> trim white spaces from both sides
  const hasTitle = typeof sticker.title == "string" && sticker.title.trim() != '';
  const hasURL = typeof sticker.url == 'string' && sticker.url.trim() != '';
  return hasTitle && hasURL;
}
// End of middleware //

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

router.post('/', (req,res,next) => {
  //console.log(req.body)
  if(validSticker(req.body)) {  
    queries.create(req.body).then(stickers => { // will return an array with items inserted into row
      res.json(stickers[0]); //just respond to api request with row we just created.
    })
  } else {
    //respond with console.error();
    next(new Error('Invalid sticker'));
  }
});

router.put('/:id', (req,res,next) => {
  
});

module.exports = router;