'use strict';

/* eslint-disable global-require */
const extend = require('extend');

const env = process.env.NODE_ENV || 'local';

const baseConfig = require('./config/protractor.base.config');
const envConfig = require(`./config/protractor.${env}.config`);
const protractorConfig = extend(true, {}, baseConfig, envConfig);

module.exports = {
    config: extend(true, {}, protractorConfig),
};
