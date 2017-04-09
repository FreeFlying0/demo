/**
 * 
 * @authors shenbao shenbaoone@gmail.com
 * @date    2017-04-09 
 * 
 */

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var url = require('url');
var fs = require('fs');
var clean = require('gulp-clean');

var srcFiles = {
    html: './src/html/**/*.html',
    css: '',
    scss: './src/css/**/*.scss',
    js: './src/js/**/*.js',
    img: './src/images/**/*.{png,jpg,gif,ico}'
};
var distFiles = {
    html: './dist/html/',
    css: '',
    scss: './dist/css',
    js: './dist/js',
    img: './dist/images'
};

gulp.task('clean', function() {
    gulp.src(['dist','ver'], {read: false})
    .pipe(clean({force: true}));
});
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 80,
      livereload: true,
      directoryListing: {
        enable: true,
        path: './'
      }
    }))
});
gulp.task('html', function () {
  gulp.src(srcFiles.html)
    .pipe(gulp.dest(distFiles.html));
});
gulp.task('img', function () {
    gulp.src(srcFiles.img)
        .pipe(gulp.dest(distFiles.img));
});
gulp.task('sass', function () {
  gulp.src(srcFiles.scss)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(distFiles.scss));
});
gulp.task('js', function () {
  gulp.src(srcFiles.js)
    .pipe(named())
    .pipe(webpack({
      output: {
        filename: '[name].js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'imports?define=>false'
        }]
      }
    }))
    .pipe(gulp.dest(distFiles.js));
});
gulp.task('watch',['html','sass','js','img'], function () {
  gulp.watch(srcFiles.html, ['html']);
  gulp.watch(srcFiles.scss, ['sass']);
  gulp.watch(srcFiles.js, ['js']);
  gulp.watch(srcFiles.img, ['img']);
});

gulp.task('default', ['watch', 'webserver'], function () {
  console.log('all task done!');
});
