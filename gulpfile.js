'use strict';

// Just say we use gulp
var gulp = require('gulp');

// Some dependencies
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var htmlbeautify = require('gulp-html-beautify');
var jsbeautify = require('gulp-jsbeautifier');


/**
  * Building tasks
***/

gulp.task('scss', function() {
    return gulp.src('src/scss/master.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('master.min.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream());
});


/**
  * Indentation part
***/
gulp.task('indentscss', function() {
    return gulp.src('src/scss/**/*.scss', {base: './'})
        .pipe(jsbeautify({
            indent_size: 2
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('indentjs', function() {
    return gulp.src('src/js/**/*.js', {base: './'})
        .pipe(jsbeautify())
        .pipe(gulp.dest('./'));
});

gulp.task('indenthtml', function() {
  var options = {
      "indent_size": 2,
  };
  return gulp.src('public/**/*.html', {base: './'})
      .pipe(htmlbeautify(options))
      .pipe(gulp.dest('./'));
});


/**
  * Main tasks
***/

gulp.task('indent', ['indentscss', 'indentjs', 'indenthtml']);

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/master.scss', ['scss']);
});

gulp.task('build', ['indent', 'scss', 'scripts']);

gulp.task('default', ['build', 'watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch("public/*.html").on('change', browserSync.reload);
});
