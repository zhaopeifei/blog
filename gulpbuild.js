var gulp = require('gulp');
var cleanCss = require('gulp-clean-css');

gulp.task('default', function(){
    gulp.src('./public/css/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('../blog_peyton/public/css'));

    gulp.src('./public/javascripts/*.js')
        .pipe(gulp.dest('../blog_peyton/public/javascripts'));

    gulp.src('./public/images/*.*')
        .pipe(gulp.dest('../blog_peyton/public/images'));

    gulp.src('./public/sources/*.*')
        .pipe(gulp.dest('../blog_peyton/public/sources'));

    gulp.src('./bin/*')
        .pipe(gulp.dest('../blog_peyton/bin'));

    gulp.src('./routes/*.js')
        .pipe(gulp.dest('../blog_peyton/routes'));

    gulp.src('./views/layouts/*.hbs')
        .pipe(gulp.dest('../blog_peyton/views/layouts'));

    gulp.src('./views/*.hbs')
        .pipe(gulp.dest('../blog_peyton/views'));

    gulp.src('./app.js')
        .pipe(gulp.dest('../blog_peyton'));

    gulp.src('./package.json')
        .pipe(gulp.dest('../blog_peyton'));
});
