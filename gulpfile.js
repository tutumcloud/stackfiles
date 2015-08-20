// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');

// tasks
gulp.task('lint', ['clean'], function() {
  gulp.src(['./src/**/*.js', '!./src/lib/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
/*gulp.task('clean', function() {
    gulp.src('./dist/**')
      .pipe(clean());
});*/
gulp.task('clean', shell.task([
  'rm -r ./dist/**'
]));
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

gulp.task('connectDist', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

// default task
gulp.task('default',
  ['lint', 'minify-css', 'minify-js', 'copy-img-files', 'copy-html-files', 'copy-bower-components', 'connectDist']
);
// build task
gulp.task('build',
  ['lint', 'minify-css', 'minify-js', 'copy-img-files', 'copy-html-files', 'copy-bower-components']
);
