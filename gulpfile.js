var gulp = require('gulp'),
  connect = require('gulp-connect')
gulp.task('connect', function () {
  connect.server({
    port: 8081,
    root: '',
    livereload: true
  })
})

gulp.task('html', function () {
  gulp.src('./demo/**/*.*')
    .pipe(connect.reload());
})

gulp.task('watch', function () {
  gulp.watch(['./demo/**/*.*'], ['html']);
})

gulp.task('default', ['connect', 'watch']);
