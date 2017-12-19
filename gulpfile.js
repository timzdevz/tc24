'use strict';
var minify = require('gulp-minify'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass');

gulp.task('scripts', function() {
    gulp.src('js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(minify({
            ext: {
                src: '-debug.js',
                min: '.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'));

    return gulp.src('js/vendor/*.js')
        .pipe(concat('vendor.js'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('styles', function() {
    gulp.src(['css/sass/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist'));


    gulp.src(['css/vendor/*.css'])
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});

gulp.task('styles:watch', function () {
    gulp.watch('css/sass/**/*.scss', ['styles']);
});

gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false}).pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});