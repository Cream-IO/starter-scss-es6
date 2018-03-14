'use strict';

// Just say we use gulp
var gulp = require('gulp');

// Used to compile SASS/SCSS files
var sass = require('gulp-sass');
// Used to rename files
var rename = require('gulp-rename');
// Used to concatenate multiple files in one
var concat = require('gulp-concat');
// Used to minify JS
var uglify = require('gulp-uglify');
// Used to reindent HTML
var htmlbeautify = require('gulp-html-beautify');
// Used to reindent SCSS/SASS & JS
var jsbeautify = require('gulp-jsbeautifier');
// Used to auto refresh browser and serve files
var browserSync = require('browser-sync').create();


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
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
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
    return gulp.src('src/scss/**/*.scss', {base: './'})
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
    return gulp.src('src/js/**/*.js', {base: './'})
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
  return gulp.src('public/**/*.html', {base: './'})
      .pipe(htmlbeautify(options))
      .pipe(gulp.dest('./'));
});


/**
  * MAIN TASKS
***/

/**
  * Reindents all JS, SCSS and HTML files
***/
gulp.task('indent', ['indentscss', 'indentjs', 'indenthtml']);

/**
  * Watches all JS & SCSS files and recompiles it when modified
***/
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/master.scss', ['scss']);
});

/**
  * Reindents then build SCSS & JS
***/
gulp.task('build', ['indent', 'scss', 'scripts']);

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
