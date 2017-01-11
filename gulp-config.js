/* globals module */

(function () {
  'use strict';

  var themeDir = './';
  var paths = {
    js: themeDir + '/src/js/*.js',
    styleguide_js: [
      themeDir + '/src/js/**/*.js',
      themeDir + '/src/**/*.js'
    ],
    dist_js: themeDir + '/dist',
    sass: themeDir,
    img: themeDir + '/images',
    dist_css: themeDir + '/dist/css',
    dist_img: themeDir + '/dist/img'
  };

  module.exports = {
    host: 'http://127.0.0.1:8888/',
    themeDir: themeDir,
    paths: paths,
    sassOptions: {
      outputStyle: 'expanded',
      eyeglass: {
        enableImportOnce: false
      }
    },
    cssConfig: {
      enabled: true,
      src: themeDir + '/src/css/**/*.scss',
      dest: themeDir + '/dist/',
      flattenDestOutput: true,
      lint: {
        enabled: false,
        failOnError: true
      },
      sourceComments: false,
      sourceMapEmbed: false,
      outputStyle: 'expanded',
      autoPrefixerBrowsers: [
        'last 2 versions',
        '- IE >= 9'
      ],
      includePaths: (['./node_modules'])
    }
  };
})();
