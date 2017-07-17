const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');

const passport = require('passport');
const flash = require('connect-flash');

const session = require('express-session');
const RDBStore = require('session-rethinkdb')(session);

require('./passport')(passport);

const r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost', port: 28015}
    ]
});

const store = new RDBStore(r,  {
    browserSessionsMaxAge: 5000, // optional, default is 60000 (60 seconds). Time between clearing expired sessions.
    table: 'session' // optional, default is 'session'. Table to store sessions in.
});

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'nunjucks');
  nunjucks.configure(config.root + '/server/views', {
      autoescape: true,
      express: app
  });

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/static'));
  app.use(methodOverride());

  app.use(session({
    // https://github.com/expressjs/session#options
    secret: 'keyboard cat',
    cookie: {
        maxAge: 7 * 24 * 3600 * 1000 // Week long cookie
    },
    store: store,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.set('trust proxy', 1);

  let controllers = glob.sync(config.root + '/server/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){

    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
