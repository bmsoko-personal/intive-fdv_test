module.exports = function takeScreenshot() {
    this.setDefaultTimeout(100 * 1000);
    this.After((scenario, callback) => {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then((png) => {
                const decodedImage = Buffer.from(png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            });
        } else {
            callback();
        }
    });
};
