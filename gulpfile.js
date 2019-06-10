const {
  src,
  dest,
  parallel,
  series
} = require( 'gulp' );
const sass = require( 'gulp-sass' );
const sassGlob = require( 'gulp-sass-glob' );
const scssLint = require( 'gulp-scss-lint' );
const autoprefixer = require( 'gulp-autoprefixer' );
const gulpClean = require( 'gulp-clean' );
const browserSync = require( 'browser-sync' );
const concatJS = require( 'gulp-concat' );
const uglify = require( 'gulp-uglify' );
const imageMin = require( 'gulp-imagemin' );
const cleanCSS = require( 'gulp-clean-css' );
const exec = require( 'child_process' ).exec;

const Base = {
  assets: './assets'
}

const Path = {
  styles: 'styles/',
  scripts: 'scripts/',
  images: 'images/'
}

function clean( callback ) {
  return src( './_site/' ).pipe( gulpClean() )

  callback()
}

function styles( callback ) {
  return src( `${Base.assets}/${Path.styles}styles.scss` )
    .pipe( sassGlob() )
    .pipe( sass() )
    .pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
    .pipe( cleanCSS( {compatibility: 'ie11'}) )
    .pipe( dest( '_site/assets/styles/' ) )

  callback();
}

function images( callback ) {
  return src( `${Base.assets}/${Path.images}**/*` )
    .pipe( imageMin() )
    .pipe( dest( '_site/assets/images/' ) )

  callback();
}

function lint( callback ) {
  return src( `${Base.assets}/${Path.styles}**/_*.scss` )
    .pipe( scssLint({
      'bundleExec': true,
      'config': '.scss-lint.yml',
      'filePipeOutput': 'scss-lint-report.xml',
      'maxBuffer': 30000000000000000000 * 1024
    }) )
    .pipe( dest('./reports') );

  callback();
}

function markup( callback ) {
  exec( 'jekyll build', function( err, stdout, stderr ) {
    console.log( stdout );
    console.log( stderr );
    callback( err );
  });
}

function server() {
  browserSync({
    server: './_site',
    port: 1999,
    files: ['./assets/styles/**/*.scss'],
    reloadOnRestart: true,
    notify: false
  })
}

function scripts() {
  return src([
    `${Base.assets}/${Path.scripts}vendor/*.js`,
    `${Base.assets}/${Path.scripts}custom/*.js`
  ])
    .pipe( concatJS( 'scripts.min.js' ) )
    .pipe( uglify() )
    .pipe( dest( './_site/assets/scripts/' ) );
}

const build = parallel( images, markup, scripts );

exports.clean = clean;
exports.styles = styles;
exports.lint = lint;
exports.markup = markup;
exports.images = images;
exports.server = server;
exports.scripts = scripts;
exports.build = series( clean, build, styles );
exports.default = series( build, styles, server );
