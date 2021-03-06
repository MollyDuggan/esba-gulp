/* globals require */

module.exports = function(gulp, config) {
  'use strict';

  // General
  var gulp = require('gulp-help')(gulp);
  var _ = require('lodash');
  var defaultConfig = require('./gulp-config');
  var config = _.defaultsDeep(defaultConfig, config);

  // scripts
  var concat = require('gulp-concat');
  var uglify = require('gulp-uglify');

  // Image Minification
  var imagemin = require('gulp-imagemin');

  // icons
  var svgSprite = require('gulp-svg-sprite');

  var tasks = {
    compile: [],
    watch: [],
    validate: [],
    clean: [],
    default: []
  };

  // SCSS/CSS
  require('./gulp-tasks/gulp-css.js')(gulp, config, tasks);

  // Tests
  require('./gulp-tasks/gulp-tests.js')(gulp, config, tasks);

  /**
   * Script Task
   */
  gulp.task('scripts', function () {
    return gulp.src(config.paths.js)
      // Concatenate everything within the JavaScript folder.
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(gulp.dest(config.paths.dist_js));
  });

  gulp.task('styleguide-scripts', function () {
    return gulp.src(config.paths.styleguide_js)
      // Concatenate everything within the JavaScript folder.
      .pipe(concat('scripts-styleguide.js'))
      .pipe(gulp.dest(config.paths.dist_js));
  });

  /**
   * Task for minifying images.
   */
  gulp.task('imagemin', function () {
    return gulp.src(config.paths.img + '/**/*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      }))
      .pipe(gulp.dest(config.paths.dist_img));
  });

  /**
   * Task for generating icon colors/png fallbacks from svg.
   */
  gulp.task('icons', function () {
    return gulp.src('**/*.svg', {cwd: config.paths.img + '/icons/src'})
      .pipe(svgSprite(config.iconConfig))
      .pipe(gulp.dest(config.themeDir + '/images/icons'));
  });

  tasks.compile.push('icons');

  /**
   * Task for running browserSync.
   */
  gulp.task('serve', ['css', 'scripts', 'styleguide-scripts', 'watch:pl'], function () {
    gulp.watch(config.paths.js, ['scripts']).on('change');
    gulp.watch(config.paths.styleguide_js, ['styleguide-scripts']).on('change');
    gulp.watch(config.paths.sass + '/**/*.scss', ['css']).on('change');
  });

  /**
   * Theme task declaration
   */
  gulp.task('theme', ['serve']);

  gulp.task('compile', tasks.compile);
  gulp.task('clean', tasks.clean);
  gulp.task('validate', tasks.validate);
  gulp.task('watch', tasks.watch);
  tasks.default.push('watch');
  gulp.task('default', tasks.default);

  /**
   * Theme task declaration
   */
  gulp.task('build', ['imagemin', 'clean', 'scripts', 'styleguide-scripts', 'css', 'icons']);

};
