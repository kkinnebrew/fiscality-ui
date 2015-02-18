var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var sequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var browserify = require('browserify');
var watchify = require('watchify');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('images', function() {
  return gulp.src('./app/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('images', function() {
  return gulp.src('./app/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('templates', function() {
  return gulp.src('./app/partials/**/*')
    .pipe(gulp.dest('./dist/partials/'));
});

gulp.task('css', function() {
  return gulp.src('./app/styles/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('bower', function() {
  return gulp.src('./app/bower_components/**/*')
    .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('html', function() {
  gulp.src('./app/index.html')
    .pipe(htmlreplace({
      'css': 'styles.css',
      'js': 'bundle.js'
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return gulp.src('./dist/*', { read: false })
    .pipe(rimraf());
});

gulp.task('build', function(callback) {
  sequence('clean', ['css', 'js', 'images', 'html', 'bower', 'templates'], callback);
});

gulp.task('default', ['build']);

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('default', ['connect']);

var bundler = watchify(browserify('./app1/scripts/app.js', {
  'opts.basedir': './'
}));

gulp.task('js', ['clean'], bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest('./dist'));
}