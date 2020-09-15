/** Authoirzation middleware */
function ensureLoggedIn(req, res, next){
  console.log("hitting ensureLoggedIn middleware")
  console.log("signed cookies are");
  console.log(req.signedCookies);
  console.log("normal cookies are:")
  console.log(req.cookies)
  //console.log(req);
  if (req.signedCookies.user_id) {
    //console.log(req);
    next(); // move on to next middleware or route handler
  }
  else{
    res.status(401);
    next(new Error('Un-Authorized'));
  }
}

function allowAccess(req, res, next) {
  console.log("hitting allow access");
  if (req.signedCookies.user_id == req.params.id) {
    next();
  } else {
    res.status(401);
    next(new Error('PENIS'));
  }
}

module.exports = {
  ensureLoggedIn,
  allowAccess,
};