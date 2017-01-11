const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

const tsGlob = 'src/**/*.ts';
const viewGlob = 'views/**/*.pug';
const dest = 'dist';

// pull in the project's TypeScript config
const tsProject = ts.createProject('tsconfig.json');
// tsProject(ts.reporter.longReporter());

gulp.task('sources', ['tslint'], function () {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(dest));
});

gulp.task('tslint', function () {
        return gulp
            .src(tsGlob)
            .pipe(tslint({
                formatter: 'verbose'
            }))
            .pipe(tslint.report({
                emitError: false,
                summarizeFailureOutput: true
            }));
    }
);

gulp.task('views', function () {
    return gulp
        .src(viewGlob)
        .pipe(gulp.dest(dest + '/views'));
});

gulp.task('watchOld', ['clean:dist', 'sources', 'views'], function () {
    gulp.watch(tsGlob, ['sources']);
    gulp.watch(viewGlob, ['views']);
});

gulp.task('watch', function (callback) {
    // first, do the clean, then, in parallel, run the compile and copy tasks
    runSequence(
        'clean:dist',
        ['sources', 'views'],
        callback);
    gulp.watch(tsGlob, ['sources']);
    gulp.watch(viewGlob, ['views']);
});

gulp.task('clean:dist', function () {
    return del.sync(dest);
});

gulp.task('default', function (callback) {
    // first, do the clean, then, in parallel, run the compile and copy tasks
    runSequence(
        'clean:dist',
        ['sources', 'views'],
        callback);
});