var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var shell = require('gulp-shell');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');

// todo: via flag
var isProduction = false;

gulp.task('scripts:main', function(){
  var uglify = $.if(isProduction, $.uglify({
    mangle: false
  })
  .on('error', function (e) {
    console.log(e);
  }));

  return gulp.src([
    'themes/red/source/_app/js/app.js',
    'themes/red/source/_app/js/**/!(app).js'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('scripts:vendor', function(){
  return gulp.src([
    'bower_components/lodash/lodash.js',
    'bower_components/angular/angular.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-animate/angular-animate.min.js'
  ])
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('hexo:build', function(){
  return gulp.src('')
  .pipe(shell([
    'hexo generate'
  ]));
});

gulp.task('clean', function(){
  return gulp.src('')
  .pipe(shell([
    'hexo clean'
  ]));
});

gulp.task('build', ['hexo:build', 'scripts:vendor', 'scripts:main']);

gulp.task('serve', ['build'], function () {
  browserSync.init({
    notify: false,
    port: 9000,
    server: "./dist",
    ghostMode: {
        scroll: true
      }
  });
});

gulp.task('watch', ['build', 'serve'], function () {
  gulp.watch([
    './source',
    './themes/red/layout/**/*',
    './themes/red/source/_app/js/**/*'
    ] , ['reload:hard']);

  // styles updated? recompile and get hexo to move them to dist
  // hexo is smart and only regens the changed files
  // gulp.watch('themes/standard/source/**/*.scss', ['styles', 'reload:soft']);
});

gulp.task('reload:hard', ['build'], function(){
  browserSync.reload();
});

gulp.task('default', ['watch']);
