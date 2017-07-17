const express = require('express');
const router = express.Router();
const userRoutes = require('./routers/users');
const Promise = require('bluebird');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = function (app) {
  app.post('/signup', userRoutes.signup);

  //app.use('/*', userRouter);
  app.use('/*', router);
};

router.post('/signup', (req, res, next)=>{
  console.log("TRYING TO CREATE USER");
  console.log(req);
  User.filter({local:{name: req.body.username }}).run().then((matches)=>{
    if (matches.length > 0){
      console.log("USERNAME ALREADY FOUND");
      res.send({success:false, message: "username already taken"});
    }
    else {
      let newUser = new User({
        displayName: req.body.username,
        local: {
          name: req.body.username,
          pwd: generateHash(req.body.password)
        }
      });

      newUser.saveAll().then((user)=>{
        res.send({success:true, message: "signup successful"})
      }).catch((err)=>{
        console.log(err);
        res.send({success:false, message: err.message});
      })
    }
  })
});

router.get('/*', (req, res)=>{
  res.render('index', {title:"Salr"});
});
