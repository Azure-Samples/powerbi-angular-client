var gulp = require('gulp-help')(require('gulp')),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('./gulp/config')(),
    merge2 = require('merge2'),
    runSequence = require('run-sequence'),
    webpack = require('webpack-stream'),
    webpackConfig = require('./webpack.config')
    ;

gulp.task('build', function (done) {
    runSequence(
        'compile:src',
        ['templates', 'replace'],
        done
    );
});

gulp.task('compile:watch', 'Watch sources', function () {
    gulp.watch(['./app/**/*.ts', './app/**/*.html'], ['compile:src', 'templates']);
});

gulp.task('compile:src', 'Compile typescript for library', function() {
    return gulp.src(['./app/**/*.ts'])
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
    return gulp.src(config.templates)
        .pipe($.plumber({
            errorHandler: function (error) {
                console.log(error);
                this.emit('end');
            }
        }))
        .pipe($.minifyHtml({
            empty: true
        }))
        .pipe($.angularTemplatecache('app.templates.js', {
            module: 'app',
            root: '/app'
        }))
        .pipe(gulp.dest(config.distFolder))
        ;
});

gulp.task('replace', function () {
    return gulp.src(config.htmlPage)
        .pipe($.htmlReplace({
            'js': ['app.js', 'app.templates.js']
        }))
        .pipe(gulp.dest(config.distFolder))
        ;
});