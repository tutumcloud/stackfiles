// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserify = require('browserify');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');

// tasks
/*gulp.task('lint', ['clean'], function() {
  gulp.src(['!./src/app/assets/js-yaml.min.js', '!./src/app/angular.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});*/

gulp.task('clean', shell.task([
  'rm -r ./dist/**'
]));

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./src/**/*.css', '!./src/lib/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compile', function() {
  browserify({
      entries: './src/app/app.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(gulp.dest('./src/app/'));
});

gulp.task('minify-js', ['compile'], function() {
  gulp.src(['./src/app/assets/*.js','./src/app/app.min.js'])
    .pipe(concat('main.js'))
    /*.pipe(uglify({
      // inSourceMap:
      // outSourceMap: "src.js.map"
    }))*/
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('minify-html', function() {
  gulp.src('./src/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-bower-components', function () {
  gulp.src('./src/lib/**')
    .pipe(gulp.dest('dist/lib'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./src/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('copy-img-files', function () {
  gulp.src('./src/img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:4000",
        files: ["./src/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;

	return nodemon({
    script: 'server.js',
    env: { 'NODE_ENV': 'development' }
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.html', ['minify-html', 'copy-html-files', 'copy-img-files']);
  gulp.watch(['./src/app/**/*.js', '!./src/app/app.min.js'], ['minify-js']);
  gulp.watch('./src/**/*.css', ['minify-css']);
});

// build task
gulp.task('build',
  ['clean', 'minify-html', 'minify-css', 'minify-js', 'copy-img-files', 'copy-html-files', 'copy-bower-components']
);

// default task
gulp.task('default',
  ['build', 'browser-sync', 'watch']
);
