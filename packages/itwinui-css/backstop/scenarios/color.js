const { scenario } = require('../scenarioHelper');

module.exports = [scenario('Type all', { selectors: ['#demo-all'], viewports: [{ width: 300, height: 600 }] })];
