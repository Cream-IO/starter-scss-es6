/* eslint-disable */
'use strict';

// Just say we use gulp
const gulp = require('gulp');
// Used to create a webserver
const webserver = require('gulp-webserver');
// Used to compile SASS/SCSS files
const sass = require('gulp-sass');
// Used to rename files
const rename = require('gulp-rename');
// Used to minify JS
const uglify = require('gulp-uglify-es').default;
// Used to reindent HTML
const htmlbeautify = require('gulp-html-beautify');
// Used to reindent SCSS/SASS & JS
const jsbeautify = require('gulp-jsbeautifier');
// Used for ES6 tu ES2015 & polyfilling
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
// Used to auto refresh browser and serve files
const browserSync = require('browser-sync').create();
// Used to copy data.json
const gulpCopy = require('gulp-copy');
// Used for sourcemaps
const sourcemaps = require('gulp-sourcemaps');
// Used for CSS metrics
const parker = require('gulp-parker');
// Used to minify images
const imagemin = require('gulp-imagemin');
// Used to delete folder
const del = require('del');

/**
 * BUILDING TASKS
 ***/

/**
 * SCSS BUILDING
 * Takes src/scss/master.scss and compiles it and all
 * the imports to public/css/master.min.css
 ***/
gulp.task('scss', function() {
  return gulp.src('src/scss/master.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(rename('master.min.css'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

/**
 * JS BUILDING
 * Takes src/js/**.js, concats and minfiies it
 * to public/js/app.min.js
 ***/
gulp.task('scripts', function() {
  return gulp.src('src/js/app.js')
    .pipe(babel())
    .pipe(webpack({
      output: {
        filename: 'app.min.js',
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
});


/**
 * INDENTATION TASKS
 ***/

/**
 * Reindents all SCSS files under src/scss
 * using 2 spaces tabs (standard for CSS)
 ***/
gulp.task('indentscss', function() {
  return gulp.src('src/scss/**/*.scss', {
      base: './'
    })
    .pipe(jsbeautify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./'));
});

/**
 * Reindents all JS files under src/js
 * using 4 spaces tabs (standard for JS)
 ***/
gulp.task('indentjs', function() {
  return gulp.src('src/js/**/*.js', {
      base: './'
    })
    .pipe(jsbeautify())
    .pipe(gulp.dest('./'));
});

/**
 * Reindents all HTML files under public
 * using 2 spaces tabs (standard for HTML)
 ***/
gulp.task('indenthtml', function() {
  var options = {
    "indent_size": 2,
  };
  return gulp.src('public/**/*.html', {
      base: './'
    })
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./'));
});

/**
 * Copy assets from source to public
 */
gulp.task('copy', function() {
  del('public/assets');
  return gulp
    .src('src/assets/**/*')
    .pipe(imagemin())
    .pipe(gulpCopy('public/assets'))
    .pipe(gulp.dest('public/assets'));
});


/**
 * Generated metrics of your final CSS
 */
gulp.task('cssmetrics', function() {
    return gulp.src('src/scss/master.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(parker({
      file: 'metrics/css_metrics.md',
      title: 'CSS METRICS REPORT'}));
});


/**
 * MAIN TASKS
 ***/

/**
 * Runs simple webserver in public/
 */
gulp.task('run', ['build'], function() {
  gulp.src('public')
    .pipe(webserver({
      open: true
    }));
});
/**
 * Reindents all JS, SCSS and HTML files
 ***/
gulp.task('indent', ['indentscss', 'indentjs', 'indenthtml']);

/**
 * Watches all JS & SCSS files and recompiles it when modified
 ***/
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
});

/**
 * Reindents then build SCSS & JS
 ***/
gulp.task('build', ['indent', 'scss', 'scripts', 'copy']);

/**
 * Builds SCSS & JS, watches it
 * opens a new browser and auto
 * reloads when files are modified
 ***/
gulp.task('default', ['build', 'watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
  gulp.watch("public/*.html").on('change', browserSync.reload);
});