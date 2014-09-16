var gulp = require('gulp'),
    util = require('gulp-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    header = require('gulp-header'),

    pkg = require('./package.json'),
    currentYear = util.date(new Date(), 'yyyy');

var paths = {
    scripts: [
        './src/ring.js'
    ]
};

var banner = '/*! <%= pkg.name %> v<%= pkg.version %> | Copyright (c) 2014-<%= currentYear %> <%= pkg.author %> | <%= pkg.license %> license | <%= pkg.homepage %> */\n';

gulp.task('test', function () {
    return gulp.src('./test/ring_test.html')
        .pipe(qunit());
});

gulp.task('default', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg, currentYear: currentYear}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'))
});