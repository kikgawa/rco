var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var postcssNest = require('postcss-nested');
var simpleMixin = require('postcss-simple-mixin');
var simpleExtend = require('postcss-simple-extend');
var simpleVars = require('postcss-simple-vars');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var scss = require('postcss-scss');
var runSequence = require('run-sequence');
var del = require('del');
var cssimport = require('gulp-cssimport');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var nano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');
var browserSync = require("browser-sync");
var prettify = require('gulp-prettify');


gulp.task('default', () => {
  runSequence(['file_dest','clean','images','fonts','css_vender','css','js','jade','watch','browserSyncTask']);
});


gulp.task('clean', () => {
  return del.sync(['dest']);
});

gulp.task('file_dest', () => {
  return gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./dest/fonts'))
});

gulp.task('css_vender', () => {
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
    postcssNest(),
    simpleMixin(),
    simpleExtend(),
    simpleVars(),
    mqpacker,
    csswring
  ];
return gulp.src('./src/css/style_vender.css')
  .pipe(cssimport({}))
  .pipe(postcss(processors, {syntax: scss}))
  .pipe(concat('vender.css'))
  .pipe(gulp.dest('./dest/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(nano())
  .pipe(gulp.dest('./dest/css'))
});
gulp.task('css', () => {
  var processors = [
    autoprefixer({browsers: ['last 2 version']}),
    postcssNest(),
    simpleMixin(),
    simpleExtend(),
    simpleVars(),
    mqpacker,
    csswring
  ];
return gulp.src('./src/css/style.css')
  .pipe(cssimport({}))
  .pipe(postcss(processors, {syntax: scss}))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./dest/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(nano())
  .pipe(gulp.dest('./dest/css'))
});

gulp.task('images', () => {
  return gulp.src('src/img/**/*')
    .pipe(imagemin({progressive: true}))
    .pipe(gulp.dest('dest/img'))
});

gulp.task('js', function () {
  gulp.src('src/js/**')
    .pipe(gulp.dest('./dest/js'))
});

gulp.task('fonts', function () {
  gulp.src('src/fonts/**')
    .pipe(gulp.dest('./dest/fonts'))
});
gulp.task('jade', function() {
  gulp.src('./src/templates/**/**.jade')
    .pipe(jade())
    .pipe(gulp.dest('./dest'))
    // If you need prettify HTML, uncomment below 2 lines.
    .pipe(prettify())
    .pipe(gulp.dest('dest'))
});
gulp.task("browserSyncTask", function () {
  browserSync({
    server: {
      baseDir: "dest"
    }
  });
  gulp.watch("src/**", function() {
    browserSync.reload();
  });
});
gulp.task('clean', function() {
  return del.sync(['dest/']);
});



gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/images/**/*', ['images']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/templates/**/*.jade', ['jade']);
});
gulp.task('watch_coding', function() {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/images/**/*', ['images']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/templates/**/*.jade', ['jade']);
});
