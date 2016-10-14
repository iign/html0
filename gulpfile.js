var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create()

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './'
  })
  gulp.watch('sass/*.scss', ['sass'])
  gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', ['serve'])
