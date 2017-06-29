const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/*', (req, res)=>{
  res.render('index', {title:"Test Title"});
});
