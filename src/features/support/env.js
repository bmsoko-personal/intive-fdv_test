module.exports = function envTools() {
    /**
     * The setDefaultTimeOut function on env.js, is intended to add more time for
     * Scenarios that at verification takes more time than usual, this
     * is generally used because the application takes too long.
     */
    this.setDefaultTimeout(100 * 1000);
    /**
     * This before scenario, is in charge of being called by cucumber
     * to add scenario info.
     */
    this.Before((scenario, callback) => {
        global.scenario = scenario;
        browser.driver.manage().deleteAllCookies();
        browser.driver.manage().window().maximize();
        callback();
    });
    /**
     * This class is intended to log test message to a file that would be
     * later used for reporting
     * @param text
     */
    global.logg = ((text) => {
        if (global) {
            global.scenario.attach(text);
        }
    });
};
