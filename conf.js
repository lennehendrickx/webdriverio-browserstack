var browserstack = require('browserstack-local');

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

    updateJob: false,
    specs: [
        './tests/single.spec.js'
    ],
    exclude: [],

    maxInstances: 10,
    commonCapabilities: {
        name: 'parallel_test',
        build: 'webdriver-browserstack',
        'browserstack.local': true
    },

    capabilities: [{
        browser: 'chrome'
    },{
        browser: 'firefox'
    },{
        browser: 'internet explorer'
    },{
        browser: 'safari'
    }],

    logLevel: 'verbose',
    coloredLogs: true,
    screenshotPath: './errorShots/',
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 5 * 60 * 1000
    },

    // Code to start browserstack local before start of test
    onPrepare: function (config, capabilities) {
        console.log("Connecting local");
        return new Promise(function(resolve, reject){
            exports.bs_local = new browserstack.Local();
            exports.bs_local.start({'key': exports.config.key }, function(error) {
                if (error) return reject(error);
                console.log('Connected. Now testing...');

                resolve();
            });
        });
    },

    // Code to stop browserstack local after end of test
    onComplete: function (capabilties, specs) {
        exports.bs_local.stop(function() {});
    }
}

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
    for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
