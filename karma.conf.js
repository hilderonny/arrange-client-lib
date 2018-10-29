module.exports = function (config) {
    const coverage_reporters  = [{ type: 'text-summary' }];
    const reporters = ['progress', 'coverage'];
    if (process.env.TRAVIS) {
        coverage_reporters .push({ type: 'lcov', dir: 'coverage' });
        coverage_reporters .push('coveralls');
    } else {
        coverage_reporters .push({ type: 'html', dir: 'coverage', 'subdir': '.' });
    }
    config.set({
        frameworks: ['mocha', 'chai'],
        files: ['arrange-client.js', 'test.js'],
        reporters: reporters,
        preprocessors: {
            'arrange-client.js': ['coverage']
        },
        coverageReporter: {
            reporters: coverage_reporters
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['ChromeHeadless'],
        autoWatch: false,
        concurrency: Infinity
    })
}