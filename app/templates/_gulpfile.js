// Node modules
var fs = require('fs');
var vm = require('vm');
var merge = require('deeply');
var chalk = require('chalk');
var es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp');
var rjs = require('gulp-requirejs-bundler');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
var requireJsOptimizerConfig = merge(requireJsRuntimeConfig,
	{
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'text!pages/about.html',
            'components/nav-bar/nav-bar',
			'pages/home'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates semantic-ui and application CSS files
gulp.task('css', function () {
    //css
	var semanticCSS = gulp.src('src/bower_modules/semantic-ui/dist/semantic.min.css');
    var appCss = gulp.src('src/css/*.css');

    return es.concat(semanticCSS, appCss)
		.pipe(concat('css.css'))
        .pipe(gulp.dest('./dist/'));
});

// Copies all semantic themes
gulp.task('themes', function() {
    return gulp.src('./src/bower_modules/semantic-ui/themes/**/*')
        .pipe(gulp.dest('./dist/themes'));
});

// Copies all images
gulp.task('images', function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'));
});

// Copies all HTML, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'css', 'images', 'themes'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
