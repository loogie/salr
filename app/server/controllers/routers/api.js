const express = require('express');
const passport = require('passport');
const router = express.Router();
const Promise = require('bluebird');
const models = require('../../models');
const User = models.User;
const thinky = require('../../config/thinky');
const r = thinky.r;

router.post('/', (req, res)=>{
  let response = {
    message: "This is a JSON POST response."
  }
  res.send(response);
});

router.post('/signup', (req, res)=>{
  passport.authenticate('local-signup', (err, user, info)=>{
    if (err) {return res.send({error:err});}
    req.login(user, (err)=>{
      if (err) { return res.send({error:err});}
      delete user.local.pwd;
      return res.send({user});
    });
  })(req, res);
})

router.post('/logout', (req, res)=>{
  req.logout();
  req.session.destroy(function (err) {
    console.log("BOOP");
    console.log(err);
      res.redirect('/'); //Inside a callback… bulletproof!
  });
});

router.post('/auth/session/:userid', (req, res)=>{
  let userid = req.params.userid;

  if (userid == req.session.passport.user){
    User.filter({id: req.session.passport.user}).run().then((matches)=>{
      if (matches.length > 0){
        let user = matches[0];
        delete user.local.pwd;
        return res.send({user});
      }
    })
    .catch((err)=>{
      return res.send({error:err});
    });
  }
});

router.post('/auth/local', (req, res)=>{
  console.log("LOGGING IN");
  passport.authenticate('local-login', (err, user, info)=>{
    if (err) {return res.send({error:err});}
    req.login(user, (err)=>{
      if (err) { return res.send({error:err});}
      delete user.local.pwd;
      return res.send({user});
    });
  })(req, res);
})


module.exports = router;
