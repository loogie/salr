const express = require('express');
const passport = require('passport');
const router = express.Router();
const Promise = require('bluebird');
const models = require('../../models');
const Article = models.Article;
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
  req.redirect('/');
});

router.post('/auth/local', (req, res)=>{
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
