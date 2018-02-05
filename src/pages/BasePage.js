'use strict';
const BasePage = function BasePage() {
    /*    MAPPING ELEMENTS    */
    this.searchBox = element(by.name('q'));
    this.seleniumHQLink = element(by.linkText('Selenium - Web Browser Automation'));

    this.go =  (page) => browser.get(page);

};
module.exports = BasePage;
