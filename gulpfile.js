var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Server = require('karma').Server;

gulp.task('default', function() {
    return gulp.src('./src/loading.module.js')
                .pipe(plugins.rename('loading.js'))
                .pipe(plugins.browserify())
                .pipe(gulp.dest('./dist'))
                .pipe(plugins.rename('loading.min.js'))
                .pipe(plugins.uglify({
                    mangle: false,
                }))
                .pipe(gulp.dest('./dist'))
                .pipe(plugins.notify({'title': 'Styles Compiled'}));
});

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['default', 'test']);
});