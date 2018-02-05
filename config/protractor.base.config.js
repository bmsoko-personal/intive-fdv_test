const chai = require('chai');

module.exports = {
    allScriptsTimeout: 50000,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: '[...]',
    // How long to wait for a page to load.
    getPageTimeout: 50000,
    maxSessions: 1,
    onPrepare: () => {
        // Disable Angular animations so e2e tests run more quickly
        browser.addMockModule('disableNgAnimate', () => {
            angular.module('disableNgAnimate', []).run($animate => {
                $animate.enabled(false);
            });
        });

        global.isAngularSite = flag => {
            browser.ignoreSynchronization = !flag;
        };
        browser.manage().timeouts().implicitlyWait(30000);
    },
    resultJsonOutputFile: 'report.json',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        './src/features/*.feature',
    ],
    cucumberOpts: {
        require: './src/features/*/*.js',
        format: 'pretty',
        keepAlive: false,
    },
};
