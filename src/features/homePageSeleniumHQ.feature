@navigateToSeleniumHQ
Feature: Navigate to seleniumhq
    As a user of the web page
    I want to be able to navigate to SeleniumHQ homepage
    So that I can see that I am on the correct page
#    Background:
#        Given I navigate to my page
#        And I refresh the browser to remove the modal

    @smoke
    @sanity
    Scenario: Verify that user can navigate to homepage SeleniumHQ
        Given I want to go to the "http://www.google.com" page
        And I type "Seleniumhq" in the searchbox
        And I press ENTER in the searchbox
        And I click on "Selenium HQ" link
        Then I am on Selenium HQ Page
