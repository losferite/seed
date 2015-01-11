var gulp = require('gulp');

var concat = require('gulp-concat');
// var concat = require('gulp-concat-util');
var less = require('gulp-less');
var watch = require('gulp-watch');
var tplGen = require('gulp-angular-templatecache');

var appFolder = '../app/';

function errorHandler(error) {
  console.log(error.toString() || error);
  this.emit('end');
}

gulp.task('less', function () {
	return gulp.src(appFolder + 'css/less/main.less')
		.pipe(less()).on('error', errorHandler)
		.pipe(concat('style.css'))
		// .pipe(prefix())
		.pipe(gulp.dest(appFolder + 'css/'));
});

gulp.task('tplGenerate', function () {
	return gulp.src(appFolder + 'partials/**/*.html')
		.pipe(tplGen({root: 'partials'}))
		.pipe(gulp.dest(appFolder + 'js/'));
});

gulp.task('js', ['tplGenerate'], function () {
	return gulp.src(appFolder + 'js/parts/**/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest(appFolder + 'js/'));
});

gulp.task('build', ['less', 'js']);

gulp.task('watch', ['build'], function() {
	watch(appFolder + '**/*.less', function() { return gulp.start('less'); });
	watch(appFolder + '**/*.js', function() { return gulp.start('js'); });
	watch(appFolder + 'partials/**/*.html', function() { return gulp.start('js'); });
	// watch(appFolder + '**/*.less', ['less']);
	// watch(appFolder + '**/*.js', ['js']);
	// watch(appFolder + 'partials/**/*.html', ['tplGenerate']);
});

gulp.task('default', ['build']);