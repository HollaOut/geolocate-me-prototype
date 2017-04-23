const gulp = require('gulp');
const concat = require('gulp-concat')
const minCss = require('gulp-clean-css');
const svg = require('gulp-svg-sprite');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');

const svgConfig = {
  shape: {
    dimension: {
      maxWidth: 500,
      maxHeight: 500
    },
    dest: 'sprite'
  },
  mode: {
    symbol: true
  }
};

const serverConfig = {
  root: 'app',
  livereload: true,
  port: 8080
};

gulp.task('connect', function() {
  connect.server( serverConfig )
});

gulp.task('css', () =>
  gulp.src( 'css/*.css' )
    .pipe( autoprefixer( { browsers: ['last 100 versions'] } ) )
    .pipe( minCss() )
    .pipe( concat( 'index.css' ) )
    .pipe( gulp.dest( 'app/css' ) )
    .pipe( connect.reload() )
);

gulp.task('js', () =>
  gulp.src( 'javascript/**/*.js' )
    .pipe( uglify() )
    .pipe( concat('index.js') )
    .pipe( gulp.dest('app/js') )
    .pipe( connect.reload() )
);

gulp.task('svg', () =>
  gulp.src( 'svg/**/*.svg' )
    .pipe( svg(svgConfig) )
    .pipe( gulp.dest('app') )
    .pipe( connect.reload() )
);

gulp.task( 'default', ['connect', 'css', 'js', 'svg'] );

gulp.watch( ['javascript/**/*.js', 'css/**/*.css', 'svg/**/*.*'], ['css', 'js', 'svg'] );
