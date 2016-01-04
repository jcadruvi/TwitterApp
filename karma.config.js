module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine', 'angular-filesort'],
    files: [
      'public/dist/bower/jquery/dist/jquery.js',
      'public/dist/bower/angular/angular.js',
      'public/dist/bower/angular-ui-router/release/angular-ui-router.js',
      'public/dist/bower/angular-sanitize/angular-sanitize.js',
      'public/dist/bower/angular-mocks/angular-mocks.js',
      'public/src/scripts/**/*.js',
      'public/dist/scripts/templates.js',
      'tests/public/**/*.spec.js'
    ],
    angularFilesort: {
      whitelist: [
        'public/src/scripts/**/*.js'
      ]
    }
  });
};