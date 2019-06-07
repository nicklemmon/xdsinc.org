'use strict';

//== Requiring Things
var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    sassGlob     = require('gulp-sass-glob'),
    scsslint     = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    shell        = require('gulp-shell'),
    clean        = require('gulp-clean'),
    browserSync  = require('browser-sync'),
    concatJS     = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    imageMin     = require('gulp-imagemin'),
    runSequence  = require('run-sequence'),
    reload       = browserSync.reload;

//== Global Variables
var base = {
  assets: './assets/'
}

var path = {
  styles: 'styles/',
  scripts: 'scripts/',
  images: 'images/'
}

// Delete the output directory
gulp.task('clean', function() {
  return gulp.src('./_site/') // delete the output dir
    .pipe(clean());
});

// Sass task
gulp.task('sass', function() {
  return gulp.src('assets/styles/styles.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(gulp.dest('_site/assets/styles/'))
});

// Linting
gulp.task('lint', function() {
  return gulp.src('assets/styles/**/_*.scss')
    .pipe(scsslint({
      'bundleExec': true,
      'config': '.scss-lint.yml',
      'filePipeOutput': 'scss-lint-report.xml',
      'maxBuffer': 30000000000000000000 * 1024
    }))
    .pipe(gulp.dest('./reports'))
});

// Using Jekyll command to build site
gulp.task('markup', shell.task([ 'jekyll build' ]));

// BrowerSync stuff for a local server and cross-browser refreshing
gulp.task('browser-sync', function() {
  browserSync({
    server: './_site',
    port: 1999,
    files: ['./assets/styles/**/*.scss'],
    reloadOnRestart: true,
    notify: false
  })
})

// Minify images
gulp.task('imageMin', function() {
  return gulp.src(base.assets + path.images + '**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('_site/assets/images/'))
})

// Concat and uglify the scripts
gulp.task('scripts', function() {
  return gulp.src([
    base.assets + path.scripts + 'vendor/*.js',
    base.assets + path.scripts + 'custom/*.js'
  ])
    .pipe(concatJS('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/assets/scripts/'))
})

//== Run These!
gulp.task('build', ['clean'], function() {
  return runSequence( 'markup', 'sass', 'imageMin', 'scripts' );
})

gulp.task('default', ['build'], function() {
  return runSequence('browser-sync', 'watch');
})

gulp.task('watch', function(){
  gulp.watch('./assets/styles/**/*.scss', ['sass']);
  gulp.watch('./assets/scripts/**/*.js', ['scripts']);
  gulp.watch('./_layouts/**/*.html', ['default']);
  gulp.watch('./_modules/**/*.liquid', ['default']);
});
