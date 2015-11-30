var gulp = require('gulp');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var stripDebug = require('gulp-strip-debug');

gulp.task('styles', function () {
	gulp.src(['assets/public/css/**/*.less'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions']
		})]))
		.pipe(gulp.dest('assets/public/css/'))
		.pipe(minifycss({
			keepSpecialComments: false
		}))
		.pipe(gulp.dest('assets/public/css/'))
	gulp.src(['assets/admin/css/admin.less'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions']
		})]))
		.pipe(gulp.dest('assets/admin/css/'))
		.pipe(minifycss({
			keepSpecialComments: false
		}))
		.pipe(gulp.dest('assets/admin/css/'))
	gulp.src(['assets/admin/css/ta-editor.less'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(postcss([autoprefixer({
			browsers: ['last 2 versions']
		})]))
		.pipe(gulp.dest('assets/admin/css/'))
		.pipe(minifycss({
			keepSpecialComments: false
		}))
		.pipe(gulp.dest('assets/admin/css/'))
});

gulp.task('scripts', function () {
	return gulp.src([
			'./bower_components/easyModal.js/jquery.easyModal.js',
			'./bower_components/jquery.cookie/jquery.cookie.js',
			'./bower_components/matchHeight/jquery.matchHeight.js',
			'./assets/public/js/**/*.js',
			'!./assets/public/js/**/*min.js'
		])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		// .pipe(jshint())
		// .pipe(jshint.reporter('default'))
		.pipe(concat('betterOptin.min.js'))
		.pipe(gulp.dest('assets/public/js/'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('assets/public/js/'))
});

gulp.task('default', function () {
	gulp.watch('assets/public/css/**/*.less', ['styles']);
	gulp.watch('assets/public/js/**/*.js', ['scripts']);
});