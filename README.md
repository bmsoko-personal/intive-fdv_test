# README #

This README attempts to explain the process followed to solve the test and configuration needed.
* * *

## Summary ##

1. Requirements
2. Project Configuration and Libraries needed
3. Protractor and Cucumber JS configuration
4. Automation process followed and mindset
5. How to run tests
6. Assumptions / Constrains

* * *
### 1. Requirements
You need to have installed on your machine:

* **Node.JS,** can be found here:  https://nodejs.org/ &  https://github.com/creationix/nvm


### 2. Project Configuration and Libraries needed ###
To install library needed for this project you just need to execute `nvm use` and then `npm i`
Which will install:

1. CucumberJs
2. Protractor
3. SeleniumWebdriver
4. And other libraries, such as the assertion one: chai

###### package.json
```
{
  "name": "intive-fdv",
  "version": "0.0.1",
  "repository": "bmsoko-personal/intive-fdv",
  "author": "Bruno M. Soko",
  "license": "MIT",
  "dependencies": {
    "chai": "latest",
    "chai-as-promised": "^7.1.1",
    "cucumber": "1.3.3",
    "fs-extra": "^0.30.0",
    "protractor": "^5.2.2",
    "protractor-cucumber-framework": "4.1.1",
    "selenium-standalone": "^6.12.0",
    "webdriver-manager": "12.0.6",
    "extend": "3.0.0"
  },
  "scripts": {
    "install-hooks": "./utils/hooks/install",
    "selenium": "./utils/scripts/selenium",
    "e2e": "./utils/scripts/protractor",
    "e2e:local": "NODE_ENV=local npm run e2e",
    "e2e:remote": "NODE_ENV=remote npm run e2e",
    "lint": "./utils/scripts/lint",
    "lint:full": "./utils/scripts/lint-full"
  },
  "devDependencies": {
    "eslint": "^3.19.0",
    "eslint-config-airbnb": "10.0.1",
    "eslint-plugin-jsx-a11y": "2.2.2",
    "eslint-plugin-import": "1.16.0",
    "eslint-plugin-react": "6.3.0"
  }
}

```

In order to have cleaner code and keep it ordered, I had chosen to implement Page-Object patter, which , in this case was bit exaggerated since it was not a whole page, it allows us to have it maintainable.

Firstly, we need to created the following folder structure, and add files to its correspondent location:

```
.../src/
    e2e
        /pages                              # Pages Objects
            <PageName>.js
        /features                           # Cucumber histories
            <FatureToTest>.feature
            /Steps_Definitions              # Cucumber steps
                <FeatureToTest>_steps.js
```



* * *

### 3. Framework configuration ###

## Protractor Configuration
Protractor is an end-to-end testing framework for AngularJS applications and works as a solution integrator - combining powerful tools and technologies such as NodeJS, Selenium, webDriver, Jasmine, Cucumber and Mocha.
It has a bunch of customizations from Selenium to easily create tests for AngularJS applications (and non-AngularJS applications)

It runs on top of the Selenium, and this provides all the benefits and advantages from Selenium.

The file that tells protractor how to run is the `/test/protractor-<env>-conf.js`. Were `<env>` is the environment that you might point to, you can specify as needed.

```
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        #Here is where we indicate the path to the .feature files
        'e2e/features/*.feature'
    ],
    cucumberOpts: {
        #Here is where we indicate the path to the .js files holding the page object patterns and the coded steps
        require: './e2e/features/*/*.js',
        format: 'pretty',
        keepAlive: false //should stop test execution when test fails
    }
```

In the file is worth mention, that you need to pay attention to the line `browser.ignoreSynchronization = true;` this line allow us to work with any kind of application non Angular.

* * *

### 4. Automation process followed and mindset ###
When I begin an automation process, I mainly follow these steps

1. Read at a glance all the requirements, in order to have a clearer idea of what's the application for.
2. I get requirements by requirement (User Stories) and write down the possible scenarios, be ware that I usually don't intent to automate all possible scenarios, since I strongly think that not everything should be automated, I wrote an article about it, if you get the change, please read: http://www.embedded.com/electronics-blogs/say-what-/4439669/Test-Automation-vs-Manual-Testing-in-Software-Development-
3. Once I know what I sort of will need, I create folder structure, independently of the frameworks needed/used, first, page object folders (refer to the above image).
For the current case scenario, and having in mind previous step, I continue by modeling the pages that I think I will need, for example, for Carrousel Widget I started by mapping the webpage's element that I'll later think I will need to use, like this:

```
    /*Mapping element page*/
    this.carouselContainer = $('.olapic-slider');
    this.sliderTitle = element(by.css('div.olapic-slider-header > .h1'));
    this.sliderPrevArrow = $('.olapic-nav-prev');
    this.sliderNextArrow = $('.olapic-nav-next');
    this.seeAllPhotosButton = $('.olapic-see-all');
    this.uploadPhotoButton = $('.olapic-upload');
    this.media = element.all(by.css('.olapic-item'));
    this.photo = element.all(by.css('.instagram'));
    this.photoUploadPopup = element(by.id('v1iframe'));
```

4. Later, I continue by creating the correspondent step file, and here is when I realized that I need to create a different page for the viewer modal.
5. Once step file, I proceed to run the tests, doing all of them by the minimum test, with this I mean, that I'll comment previous tests to check it works alright isolated.
6. Then I run all tests together and see how they all behave and the time that they take to run.
7. For most of the scenarios that, must have, an assertion, I always check if the assertion that I am making is asserting what it needs to assert, by this I mean that if I have the following assertion:

```
        expect(await CarouselPage.photoUploadPopup.isDisplayed()).to.be.true;

```


I usually change, the `true` to `false` and I add add invalid value to `id`, in that way I make sure they are doing what they tell.

8. Depending on my project's responsibility, I usually get to configure the CI environment, but it always depends on the development process followed, on a personal opinion, I think that CI-SAAS are better, since it saves team's mate time on maintenance.

* * *

### 5. How to run the tests ###

To run the test you must:
   1. Clone the repo.
   2. Checkout branch: `bruno_configs`
   3. Execute `nvm use && npm i`
   4. Open your prefered terminal and exexute: `npm run selenium`
   5. Open another tab in your terminal and execute: `npm run e2e:local`

> This can be improved, depending on the development process being followed and the tools used, but for most of the CI tools, just like CircleCi, including `npm test` would to the trick.

* * *


### 7. Assumptions / Constraints ###

* It was assumed, that the only Test Case created is the need by the exam, so no more scenarios where included.
* It was assumed, that as the assignment was send, me in this case I automated the scenarios as it is, meaning that it could be easily improved to be more fast and optimized.

### Reporting / Results ###

* I had added some support code to create reports, you can check them on the repo once you run the test.

* * *
