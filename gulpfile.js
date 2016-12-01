// config globals
var useproxy = false;

var src = './src/';
var dist = './assets/';

// only required if useproxy = true
var proxyUrl = 'local.app.com';
var localPort = 3000;

// my scripts: default load all script of folder js/*
var scripts = [
  src + 'js/**/*.js'
];

// bower folder
var bower = './bower_components/';
// var plugins path 
var plugins = [
  bower + 'jquery/dist/jquery.min.js'
];


// define package
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  gcmq = require('gulp-group-css-media-queries'),
  sourcemaps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// tasks
// sass mappgins files
gulp.task('styles:dev', function(){
  var processors = [
    autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']})
  ];

  gulp.src(src + 'scss/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(dist + 'css/'))
  .pipe(browserSync.stream());
});

// sass dist remove source maps
gulp.task('styles:dist', function(){
  var processors = [
    autoprefixer({browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4']}),
    cssnano()
  ];

  gulp.src(src + 'scss/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gcmq())
  .pipe(postcss(processors))
  .pipe(gulp.dest(dist + 'css/'));
});

// minify images
gulp.task('images', function(){
  gulp.src(src + 'img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest(dist + 'img/'));
});

// copy fonts
gulp.task('fonts', function(){
  gulp.src(src + 'fonts/**/*')
  .pipe(gulp.dest(dist + 'fonts/'));
});

// minify script js
gulp.task('main', function(){
  gulp.src(scripts)
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jshint.reporter('fail'))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dist + 'js/'));
});

// plugins js minify
gulp.task('pluginsjs', function(){
  gulp.src(plugins)
  .pipe(concat('plugins.js'))
  .pipe(uglify())
  .pipe(gulp.dest(dist + 'js/'));
});

// serve
gulp.task('serve', function(){
  if(useproxy){
    browserSync.init({
      proxy: proxyUrl,
      port: localPort
    });
  }else{
    browserSync.init({
      server: {
        baseDir: "./"
      },
      port: localPort
    });
  }
  gulp.watch(src + 'scss/**/*.scss', ['styles:dev']);
  gulp.watch(src + 'js/**/*.js', ['main']).on('change', reload);
  gulp.watch(src + 'img/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)').on('change', reload);
  gulp.watch('./**/*.php').on('change', reload);
  gulp.watch('*.html').on('change', reload);
});


// tasks globals not sass
gulp.task('static', ['pluginsjs', 'main', 'images', 'fonts']);

// build all
gulp.task('build', ['styles:dev', 'static']);
// gulp minify all
gulp.task('dist', ['styles:dist', 'static']);
// dev default tasks
gulp.task('default', ['build', 'serve']);
