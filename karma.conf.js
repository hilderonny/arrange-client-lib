module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: ['arrange-client.js', 'test.js'],
        reporters: ['progress', 'coverage', 'coveralls'],
        preprocessors: {
            'arrange-client.js': ['coverage']
        },
        coverageReporter: {
            type: 'lcov',
            dir: 'coverage/'
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity
    })
}