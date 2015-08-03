var gulp = require('gulp'),
    tsc = require('gulp-typescript');
    babel = require('gulp-babel'),
    del = require('del'),
    cache = require('gulp-cached'),
    concat = require('gulp-concat'),
    remember = require('gulp-remember'),
    minimist = require('minimist'),
    connect = require('gulp-connect');

function getBabelOptions(moduleType) {
  return {
    modules: moduleType || "system",
    moduleIds: true,
    getModuleId: function(name) {
      return "app/" + name;
    }
  }
}

var tscOptions = {
  target: 'ES6',
  allowNonTsExtensions: true,
  isolatedModules: true,
  emitDecoratorMetadata: true,
  experimentalDecorators: true,
  noEmitOnError: false,  // ignore errors
  rootDir: '.'
}

var tscReporter = {
  error: function (error) {
    console.error(error.message);
  }
};

var flagConfig = {
  string: 'port',
  default: { port: 8100 }
};

var flags = minimist(process.argv.slice(2), flagConfig);

gulp.task('serve', ['build'], function() {
  connect.server({
    root: 'www',
    port: flags.port,
    livereload: false
  });
});

gulp.task('clean', function(done) {
  del(['www/_app'], done);
});

gulp.task('watch', ['serve'], function(){
  gulp.watch('app/**/*.js', ['transpile']);
  gulp.watch('app/**/*.html', ['copy-html']);
});

function transpile(moduleType) {
  var stream = gulp.src(['app/**/*.js'])
    .pipe(cache('transpile', { optimizeMemory: true }))
    // transpile to es6 with typescript compiler for decorators
    // you could have type checking by changing the reporter
    // but we don't use it
    .pipe(tsc(tscOptions, null, tscReporter))
    .on('error', function (err) {
      stream.emit('end');
    })
    // lower es6 to es5 wrapped in System.register() using babel
    .pipe(babel(getBabelOptions(moduleType)))
    .on('error', function (err) {
      console.log("ERROR: " + err.message);
      this.emit('end');
    })
    // only want to transpile files that have changed, but need to concatenate
    // all transpiled files into our bundle
    .pipe(remember('es5-source-files'))
    // create the bundle
    .pipe(concat('app.bundle.js'))
    .pipe(gulp.dest('www/_app'));

  return stream;
}

gulp.task('transpile', function(){ return transpile("system") });
gulp.task('transpile.commonjs', function(){ return transpile("common") });

gulp.task('copy-html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('www/_app'));
});

gulp.task('copy-lib', function() {
  return gulp.src([
      'lib/ionic/js/bundle.js',
      //'lib/**/*.js',
      'lib/**/*.css',
      'lib/**/fonts/**/*'
     ])
     .pipe(gulp.dest('www/lib'));
});

gulp.task('build', ['copy-lib', 'copy-html', 'transpile']);
