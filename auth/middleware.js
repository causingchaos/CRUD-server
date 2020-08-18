function ensureLoggedIn(req, res, next){
  console.log(req.signedCookies);
  //console.log(req);
  if (req.signedCookies.user_id) {
    next(); // move on to next middleware or route handler
  }
  else{
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}

module.exports = {
  ensureLoggedIn
};