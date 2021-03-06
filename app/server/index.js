const express = require('express');
const config = require('./config/config');

let app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, ()=>{
  console.log("Express server listening on port " + config.port);
});
