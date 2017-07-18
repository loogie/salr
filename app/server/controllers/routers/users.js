const passport = require('passport');
const bcrypt = require('bcrypt-nodejs')
const models = require("../../models");
const User = models.User;

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
const validPassword = function(user, password) {
    return bcrypt.compareSync(password, user.local.pwd);
};

exports.session = (req, res, next)=>{
  if (req.user){
    let safeUser = req.user;
    delete safeUser.local.pwd;
    return res.json({ success: true, message: "session user found", user:safeUser });
  }
  else {
    return res.json({ success:false, message: "no session user found"});
  }
}

exports.login = (req, res, next)=>{
  // Do email and password validation for the server
	passport.authenticate("local", function(err, user, info) {

		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })
		}
		// ***********************************************************************
		// "Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response."
		// Source: http://passportjs.org/docs
		// ***********************************************************************
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}

      let safeUser = user;
      delete safeUser.local.pwd;

			return res.json({ success: true, message: "authentication succeeded", user:safeUser })
		})
	})(req, res, next)
};

exports.logout = (req, res, next)=>{
  console.log("LOGOUT");
  req.logout();
  next();
};


exports.signup = (req, res, next) => {
  console.log("TRYING TO CREATE USER");
  console.log(req.body);
  if (req.body.username){
    // Do email and password validation for the server
  	passport.authenticate("signup", function(err, user, info) {

  		if(err) return next(err)
  		if(!user) {
  			return res.json({ success: false, message: info.message })
  		}
  		// ***********************************************************************
  		// "Note that when using a custom callback, it becomes the application's
  		// responsibility to establish a session (by calling req.login()) and send
  		// a response."
  		// Source: http://passportjs.org/docs
  		// ***********************************************************************
  		// Passport exposes a login() function on req (also aliased as logIn())
  		// that can be used to establish a login session
  		req.logIn(user, loginErr => {
  			if(loginErr) {
  				return res.json({ success: false, message: loginErr })
  			}
        let safeUser = user;
        delete safeUser.local.pwd;

  			return res.json({ success: true, message: "signup succeeded", user:safeUser })
  		})
  	})(req, res, next)
  }
  else {
    console.log("NO BODY");
    res.send({success:false, message: "No body posted"});
  }
};
