const path = require('path'),
      fs = require('fs'),
      gulp = require('gulp'),
      webpack = require('webpack-stream'),
      webpackConfig = require('./webpack.config.js'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      gif = require('gulp-if'),
      less = require('gulp-less');

const isProduction = /production/.test(process.env.NODE_ENV);

function watch() {
  gulp.watch('./src/**/*.less', gulp.series(lessTask));
  gulp.watch('./src/**/*.js', gulp.series(webpackTask));
}

function webpackTask() {
  gulp.src('./src/**/*.js')
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest('./output/js'))
}

function lessTask() {
  gulp.src('./src/**/*.less')
  .pipe(gif(!isProduction, sourcemaps.init()))
  .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
  .pipe(autoprefixer())
  .pipe(gif(!isProduction, sourcemaps.write()))
  .pipe(gulp.dest('./output'));
}

function defaultTask( cb ) {
  webpackTask();
  lessTask();
  watch();
  cb();
}

exports.default = defaultTask;
