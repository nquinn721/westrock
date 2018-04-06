var gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	join = require('path').join;
 
gulp.task('less', function () {
	console.log('ran');
	
  return gulp.src(join('.', 'public', 'less', '**', '*.less'))
 	.pipe(concat('main.less'))
    .pipe(less())
    .pipe(gulp.dest(join('.', 'public', 'css')));
});


gulp.task('default', function () {
    gulp.watch(join('.', 'public', 'less', '**'), ['less']);
});