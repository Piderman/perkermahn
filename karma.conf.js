// Karma configuration
// Generated on Sat Mar 05 2016 16:13:59 GMT+1100 (AUS Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // dependencies
      'bower_components/lodash/lodash.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // src
      'themes/red/source/_app/js/app.js',
      'themes/red/source/_app/js/**/!(app).js',

      // tests
      'test/mocks/*.js',
      'test/**/*[sS]pec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'themes/red/source/_app/js/**/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],

    mochaReporter: {
      ignoreSkipped: true
    },

    coverageReporter: {
      reporters: [
        {
          type : 'html',
          dir : 'coverage/'
        },
        { type: 'text-summary'}
      ]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
