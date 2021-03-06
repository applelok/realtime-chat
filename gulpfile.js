var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var bundle = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var app = require('./app.js');

gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
});


gulp.task('watch', ['browserSync','sass'], function (){
 gulp.watch('src/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  console.log('watching css, js, html');
  gulp.watch('src/*.html', browserSync.reload); 
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.js',browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch('src/css/**/*.css', browserSync.reload);
});

gulp.task('bundle', function(){
  return gulp.src('src/*.html')
    .pipe(bundle())
     // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});
