var gulp      = require('gulp'),
  del         = require('del'),
  concat      = require('gulp-concat'),
  minifyCSS   = require('gulp-minify-css'),
  uglify      = require('gulp-uglify'),
  rename      = require("gulp-rename"),
  htmlreplace = require('gulp-html-replace'),
  minifyHTML  = require('gulp-minify-html');

gulp.task('concat', function() {
  return gulp.src('./app/css/*.css')
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('minify-css', ['concat'], function() {
  return gulp.src('./build/css/app.css')
    .pipe(minifyCSS({
      keepBreaks: true,
    }))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('images', function(cb) {
  return gulp.src('./app/img/*.{png,jpg,jpeg,gif}')
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts', function(cb) {
  return gulp.src('./app/fonts/*')
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('libs', function(cb) {
  return gulp.src('./app/libs/*')
    .pipe(gulp.dest('./build/libs/'));
});

gulp.task('uglify', function() {
  return gulp.src('./app/js/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});

gulp.task('html-replace',function() {
  var opts = {comments:false,spare:false,quotes:true};
  return gulp.src('./app/*.html')
    .pipe(htmlreplace({
        'css': 'css/app.min.css',
        'js': 'js/app.min.js'
    }))  
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('./build/'));
});

gulp.task('clean', function(cb) {
  return del('build', cb);
});

gulp.task('default', ['html-replace','minify-css', 'images', 'fonts', 'libs', 'uglify']);
