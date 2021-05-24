const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  scenario('Default wizard', {
    selectors: ['#demo-default'],
  }),
  scenario('Long wizard', {
    selectors: ['#demo-long'],
  }),
  scenario('Workflow wizard', {
    selectors: ['#demo-workflow'],
  }),
  scenario('Default wizard hover on complete', {
    actions: [hover('#demo-default .iui-wizards-step-completed:first-child')],
    selectors: ['#demo-default'],
  }),
  scenario('Long wizard focus on complete', {
    actions: [
      focus(
        '#demo-long .iui-wizards-step-completed:first-child > .iui-wizards-step-circle'
      ),
    ],
    selectors: ['#demo-long'],
  }),
];
