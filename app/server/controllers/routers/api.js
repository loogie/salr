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

router.post('/get/users/displayName/:displayName', (req, res)=>{
  let displayName = req.params.displayName;

  User.filter({displayName}).run().then((users)=>{
    let user = null;
    if (users.length > 0){
      user = makeUserSafe(users[0]);
    }
    console.log("sending user");
    console.log(user)
    res.send({user});
  })
  .catch((err)=>{
    res.send({error:err});
  })
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
  console.log("LOGGED OUT");
  console.log(req.user);
  return res.send({logout:true});
});

router.post('/auth/session/:userid', (req, res)=>{
  let userid = req.params.userid;
  if (userid == req.user.id){
      let user = req.user;
      delete user.local.pwd;
      return res.send({user});
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

function makeUserSafe(user){
  let newUser = Object.assign({}, user);
  delete newUser.local.pwd;
  return newUser;
}

module.exports = router;
