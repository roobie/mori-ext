var gulp = require('gulp');
var babel = require("gulp-babel");
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

// so that we can write tests in es6
require('babel-core/register');



gulp.task('lint', function () {
  gulp.src(['src/*.js', 'spec/*.js'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    //.pipe(eslint.failOnError());
});

gulp.task('watch-lint', function () {
    gulp.watch(['src/*.js', 'spec/*.js'], ['lint']);
});

gulp.task("js", function () {
  return gulp.src(['src/*.js'])
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('watch-js', function () {
    gulp.watch(['src/*.js'], ['js', 'spec']);
});

gulp.task('spec', function () {
  return gulp.src('spec/*.js', {read: false})
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('watch-spec', function () {
    gulp.watch(['spec/*.js'], ['js', 'spec']);
});


gulp.task("default", [
  'lint',
  'watch-lint',
  'spec',
  'watch-spec',
  'js',
  'watch-js'
]);
