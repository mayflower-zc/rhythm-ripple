const gulp = require('gulp')
const browserify = require("browserify")
const source = require('vinyl-source-stream')
const babelify = require("babelify")
const browserSync = require("browser-sync").create()

gulp.task('scripts', function () {
  return browserify({
    entries: './src/rhythmDisk.js',
    insertGlobals : true,
    standalone:'umd'
  })
    .transform(babelify, {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source('rhythmDisk.js')) // gives streaming vinyl file object

    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['scripts'], function () {
  browserSync.init({
    port: (new Date).getFullYear(),
    server: {
      baseDir: ['./']
    }
  })
  gulp.watch('src/*.js', ['scripts'])
})