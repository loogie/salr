const express = require('express');
const router = express.Router();
const userRoutes = require('./routers/users');
const Promise = require('bluebird');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = function (app) {
  app.post('/session', userRoutes.session);
  app.post('/signup', userRoutes.signup);
  app.post('/login', userRoutes.login);
  app.post('/logout', userRoutes.logout);

  //app.use('/*', userRouter);
  app.use('/*', router);
};

router.get('/*', (req, res)=>{
  console.log(req.user);

  res.render('index', {title:"Salr"});
});
