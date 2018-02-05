'use strict';
const SeleniumHQPage = function SeleniumHQPage() {
    /*    MAPPING ELEMENTS    */
    this.tite = element(by.className('title'));


    /*FUNCTIONS*/

    this.checkTitlePage = async (page) => browser.get(page);

};
module.exports = SeleniumHQPage;
