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

gulp.task('build', function () {
  var path = require('path')
  var rimraf = require('gulp-rimraf')
  var concat = require('gulp-concat')
  var uglify = require('gulp-uglify')
  var rev = require('gulp-rev')

  var rootDir = './demo/baiduMap/'
  var distDir = path.join(rootDir, 'dist')

  gulp.task('clean', function () {
    return gulp.src(distDir, {
        read: false
      })
      .pipe(rimraf({
        force: true
      }))
  })

  gulp.task('default', ['clean'], function () {
    return gulp.src([
        rootDir + 'data.js',
        rootDir + 'config.js',
        rootDir + 'main.js',
        rootDir + 'city.js',
        rootDir + 'province.js',
        rootDir + 'project.js',
        rootDir + 'util.js',
        rootDir + '/*.js',
      ])
      .pipe(concat('dist.js'))
      .pipe(uglify({
        mangle: false
      }))
      .pipe(rev())
      .pipe(gulp.dest(distDir))
  })
})