// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');

// tasks
gulp.task('lint', function() {
  gulp.src(['./src/**/*.js', '!./src/lib/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./src/**/*.css', '!./src/lib/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'));
});
gulp.task('minify-js', function() {
  gulp.src(['./src/**/*.js', '!./src/lib/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "src.js.map"
    }))
    .pipe(gulp.dest('./dist/'));
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
gulp.task('connect', function () {
  connect.server({
    root: 'src/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

/*gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});*/


// default task
gulp.task('default',
  ['lint', 'connect']
);
// build task
gulp.task('build',
  ['lint', 'minify-css', 'minify-js', 'copy-html-files','copy-img-files', 'copy-bower-components', 'connectDist']
);
