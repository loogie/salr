const express = require('express');
const router = express.Router();
const apiRouter = require('./routers/api');
const Promise = require('bluebird');

module.exports = function (app) {
  app.use('/api', apiRouter);
  app.use('/*', router);
};

router.get('/*', (req, res)=>{
  let sessionuser = null;
  if (req.session && req.session.passport){
    sessionuser = req.session.passport.user;
  }
  console.log(sessionuser);
  res.render('index', {title:"Salr", userid:sessionuser});
});
