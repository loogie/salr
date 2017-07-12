const gulp          = require('gulp');
const exec          = require('child_process').exec;
const gls           = require('gulp-live-server');
const scssify       = require('scssify');
const postCss       = require('postcss')
const sass          = require('gulp-sass');
const source        = require('vinyl-source-stream');
const browserify    = require('browserify');
const minifyify     = require('minifyify');
const babelify      = require('babelify');
const plumber       = require('gulp-plumber');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const npmcheck = require('gulp-npm-check');

gulp.task('deps', function(cb) {
  npmcheck(cb);
});

var paths = {
  main_css : [ 'app/client/stylesheets/main.scss' ],
  css      : [ 'app/client/stylesheets/**/*.scss' ],
  main_js  : [ 'app/client/index.js' ],
  js       : [ 'app/client/**/*.js*' ],
  db       : [ 'app/data' ],
};

gulp.task('db', function(cb){
  exec('rethinkdb -d ' + paths.db, function(err, stdout, stderr){
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
});

gulp.task('js', function() {
  var bundler = browserify(paths.main_js)
                .transform('babelify', {
                  presets : [ 'es2015', 'react' ]
                })
                .transform(scssify, {
                  // Disable/enable <style> injection; true by default
                  autoInject: true,

                  // Useful for debugging; adds data-href="src/foo.scss" to <style> tags
                  autoInject: 'verbose',

                  // This can be an object too
                  autoInject: {
                    verbose: false,

                    // If true the <style> tag will be prepended to the <head>
                    prepend: false
                  },

                  // require('./MyComponent.scss').css === '.MyComponent{color:red;background:blue}'
                  // autoInject: false, will also enable this
                  // pre 1.x.x, this is enabled by default
                  export: false,

                  // Pass options to the compiler, check the node-sass project for more details
                  sass: {
                    // See the relevant node-sass documentation
                    //importer: 'custom-importers.js',

                    // This will let the importer state be reset if scssify
                    // is called several times within the same process, e.g. by factor-bundle
                    // should export a factory function (which returns an importer function)
                    // overrides opt.sass.importer
                    //importerFactory: 'custom-importer-factory.js',

                    // Enable both of these to get source maps working
                    // "browserify --debug" will also enable css sourcemaps
                    sourceMapEmbed: true,
                    sourceMapContents: true,

                    // This is the default only when opt.sass is undefined
                    outputStyle: 'compressed'
                  },

                  // Configure postcss plugins too!
                  // postcss is a "soft" dependency so you may need to install it yourself
                  postcss: {
                    autoprefixer: {
                      browsers: ['last 2 versions']
                    }
                  }
                })

  if (IS_PRODUCTION) {
    bundler = bundler.plugin('minifyify', {
      map      : false,
      compress : {
        drop_debugger : true,
        drop_console  : true
      }
    })
  }

  bundler.bundle().on('error', function(err) {
    console.error('[browserify error]', err.message);
  }).pipe(source('bundle.js'))
    .pipe(gulp.dest('app/static/js'));
});

gulp.task('serve', [ 'js' ], function () {

  // Generic watch tasks for SASS and Browserify
  gulp.watch('app/client/**/*.{*css,js*}', [ 'js' ]);

  // Start the app server.
  var server = gls('app/server/index.js', { stdio : 'inherit' });
  server.start();

  // Reload server when backend files change.
  gulp.watch([ 'app/server/**/*.js', 'app/sites/**/*.js' ], function() {
    server.start.bind(server)();
  });

  // Notify server when frontend files change.
  gulp.watch([ 'app/static/**/*.{css,js,html}', 'app/sites/**/*.js' ], function(file) {
    server.notify(file);
  });
});

gulp.task('default', [ 'db', 'serve' ]);
