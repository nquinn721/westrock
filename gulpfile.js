var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify'),
  cleanCSS = require('gulp-clean-css'),
	join = require('path').join;
 
gulp.task('less', function () {
	console.log('ran');
	
  return gulp.src(join('.', 'public', 'less', '**', '*.less'))
 	.pipe(concat('main.less'))
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(join('.', 'dist', 'css')));
});

gulp.task('js', function() {
  gulp.src(join('public', 'js', '**', '*.js'))
 	.pipe(concat('main.js'))
    .pipe(minify())
    .pipe(gulp.dest(join('dist', 'js')));
});


gulp.task('default', function () {
    gulp.watch(join('.', 'public', 'less', '**'), ['less']);
    gulp.watch(join('.', 'public', 'js', '**'), ['js']);
});