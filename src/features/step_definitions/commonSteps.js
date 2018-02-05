'use strict';

const BasePage = require('../../pages/BasePage.js');
const chai = require('chai');
const EC = protractor.ExpectedConditions;
chai.config.truncateThreshold = 0; // disable truncating
const expect = chai.expect;
module.exports = function commonSteps() {
    let basePage;
    this.Before(() => {
        basePage = new BasePage();
        isAngularSite(false);
    });

    /*Given*/
    this.Given(/^I want to go to the "([^"]*)" page$/,async (page) => {
        await basePage.go(page);
    });

    /*When*/
    this.When(/^I type "([^"]*)" in the searchbox$/,async (textToSearch) => {
        await basePage.searchBox.sendKeys(textToSearch);
    });

    this.When(/^I press ENTER in the searchbox$/,async () => {
        await basePage.searchBox.sendKeys(protractor.Key.ENTER);
    });

    this.When(/^I click on "Selenium HQ" link$/,async () => {
        await basePage.seleniumHQLink.click();
    });

    /*Then*/
    this.Then(/^I am on Selenium HQ Page$/,async () => {
        expect(await browser.getTitle())
            .to.be.equal(
            'Selenium - Web Browser Automation',
            'Invalid Page'
        );
    });
};
