const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('Type all', { selectors: ['#demo'], hideSelectors: ['h2'] }),
];
