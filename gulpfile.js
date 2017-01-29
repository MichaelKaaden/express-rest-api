'use strict';

const gulp = require('gulp');
const del = require('del');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

const dest = 'dist';
const sourceDest = dest + '/src';

const publicGlob = 'public/**';
const specGlob = sourceDest + '**/*.spec.js';
const tsGlob = 'src/**/*.ts';
const viewGlob = 'views/**/*.pug';

// pull in the project's TypeScript config
const tsProject = ts.createProject('tsconfig.json');
// tsProject(ts.reporter.longReporter());

gulp.task('sources', ['tslint'], function () {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(sourceDest));
});

gulp.task('tslint', function () {
        return gulp
            .src(tsGlob)
            .pipe(tslint({
                formatter: 'stylish'
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
    }
);

gulp.task('test', ['sources'], function () {
    return gulp.src([specGlob], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log);
});

// same as task 'test', but will exit properly
// see https://github.com/sindresorhus/gulp-mocha#test-suite-not-exiting
gulp.task('exitingTest', ['sources'], function () {
    return gulp.src([specGlob], {read: false})
        .pipe(mocha({reporter: 'spec'}))
        .on('error', gutil.log)
        .once('end', function () {
            process.exit();
        });
});

gulp.task('public', function () {
    return gulp
        .src(publicGlob)
        .pipe(gulp.dest(dest + '/public'));
});

gulp.task('views', function () {
    return gulp
        .src(viewGlob)
        .pipe(gulp.dest(dest + '/views'));
});

gulp.task('watch', function (callback) {
    // first, do the clean, then, in parallel, run the compile and copy tasks
    runSequence(
        'clean:dist',
        ['public', 'sources', 'views'],
        'test',
        callback);
    gulp.watch(publicGlob, ['public']);
    gulp.watch(tsGlob, ['sources', 'test']);
    gulp.watch(viewGlob, ['views']);
});

gulp.task('clean:dist', function () {
    return del.sync(dest);
});

gulp.task('clean:test', function () {
    return del.sync(specGlob);
});

gulp.task('default', function (callback) {
    // first, do the clean, then, in parallel, run the compile and copy tasks
    runSequence(
        'clean:dist',
        ['public', 'sources', 'views'],
        'exitingTest',
        'clean:test',
        callback);
});