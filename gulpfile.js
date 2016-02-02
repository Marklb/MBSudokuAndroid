'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
// var sass = require('gulp-sass');


gulp.task('default', function () {
    return gulp.src('src/*.es6')
      .pipe(babel({
    		presets: ['es2015']
      }))
      .pipe(gulp.dest('./www/js'));
});

gulp.task('babel', function() {
  return gulp.src('src/**/*.es6')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./www/js'))
});

// gulp.task('sass', function () {
//   gulp.src('./src/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('movehtml', function() {
//   return gulp.src('src/**/*.html')
//     .pipe(gulp.dest('dist'))
// });


gulp.task('watch', ['babel'], function (){
  // gulp.watch('src/**/*.html', ['movehtml']);
  gulp.watch('src/**/*.es6', ['babel']);
  // gulp.watch('src/**/*.scss', ['sass']);

});
