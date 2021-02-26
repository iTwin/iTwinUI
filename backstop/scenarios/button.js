const { scenario } = require('../scenarioHelper')

module.exports = [
  scenario('default', {
    selectors: ['#demo-default'],
  }),
  scenario('grouped', {
    selectors: ['#demo-grouped'],
  }),
  scenario('invisible', {
    selectors: ['#demo-invisible'],
  }),
  scenario('ideas', {
    selectors: ['.iui-buttons-idea'],
  }),
]
