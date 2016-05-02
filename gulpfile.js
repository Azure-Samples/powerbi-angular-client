var gulp = require('gulp-help')(require('gulp')),
    $ = require('gulp-load-plugins')({ lazy: true }),
    config = require('./gulp/config')(),
    exec = require('child_process').execSync,
    merge2  = require('merge2'),
    runSequence = require('run-sequence')
    ;


gulp.task('build', function (done) {
    runSequence(
        ['build:js', 'templates', 'replace'],
        done
    );
});

gulp.task('compile', function (done) {
    runSequence(
        'compile:app',
        'copy:modules',
        done
    )
});

gulp.task('build:js', function() {
    exec('npm run buildjs', function(err, stdout, stderr) {
        if (err) {
            throw err;
        }
        else {
            console.log('Build complete!');
        }
    });
});

gulp.task('compile:app', function () {
    var tsProject = $.typescript.createProject('tsconfig.json');
    
    var tsResult = gulp.src(['typings/browser/**/*.d.ts', './app/**/*.ts'])
        .pipe($.typescript(tsProject))
        ;
        
    return tsResult.js
        .pipe(gulp.dest('./app'));
});

gulp.task('copy:modules', function () {
    return gulp.src(['./app/**/*module.ts'])
        .pipe($.rename({
            extname: ".js"
        }))
        .pipe(gulp.dest('./app'));
});

gulp.task('templates', function() {
    return gulp.src(config.templates)
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

gulp.task('replace', function() {
    return gulp.src(config.htmlPage)
        .pipe($.htmlReplace({
            'js': ['app.js', 'app.templates.js']
        }))
        .pipe(gulp.dest(config.distFolder))
        ;
});