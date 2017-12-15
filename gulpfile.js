var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
let cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel')
var imagemin = require('gulp-imagemin');

gulp.task('watch', ['browserSync', 'sass','minify-css','imagemin','uglify'], function (){
  gulp.watch('assets/scss/main.scss', ['sass']); 
  gulp.watch('dist/style.css',['minify-css']);
  gulp.watch('assets/js/app.js',['uglify']);
  gulp.watch('assets/img/*',['imagemin']);
});

gulp.task('minify-css', () => {
  return gulp.src('dist/css/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'))
});



gulp.task('browserSync', function() {
  browserSync.init({
    server:'./'
  });
});

gulp.task('sass', function(){
  return gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


 
gulp.task('uglify', function() {
  gulp.src('assets/js/app.js')
    .pipe(rename({suffix:'.min'}))
    .pipe(babel({
        presets:['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('imagemin', () =>
    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))
);

gulp.task('default', ['browserSync','uglify','imagemin','sass','minify-css','watch']);