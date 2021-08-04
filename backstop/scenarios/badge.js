const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('basic', { selectors: ['#demo'], hideSelectors: ['h2'] }),
];
