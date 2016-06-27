var gulp = require('gulp');
var sass = require('gulp-sass');
var csscomb = require('gulp-csscomb');

gulp.task('sass', function() {
    return gulp.src('./public/sass/*.scss')
        .pipe(sass({outputStyle:'nested'}).on('error', sass.logError))
        .pipe(csscomb())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function(){
    gulp.watch('./public/sass/*.scss', ['sass']);
});