const { scenario, hover, focus, click } = require('../scenarioHelper');

module.exports = [
  // Toast types
  scenario('Type All', {
    selectors: ['.iui-toast-wrapper'],
  }),

  // Hover states
  scenario('State hover link in informational', {
    actions: [hover('#demo-informational a')],
    selectors: ['#demo-informational'],
  }),
  scenario('State hover link in positive', {
    actions: [hover('#demo-positive a')],
    selectors: ['#demo-positive'],
  }),
  scenario('State hover link in negative', {
    actions: [hover('#demo-negative a')],
    selectors: ['#demo-negative'],
  }),
  scenario('State hover link in warning', {
    actions: [hover('#demo-warning a')],
    selectors: ['#demo-warning'],
  }),

  // Focus states
  scenario('State focus link in informational', {
    actions: [focus('#demo-informational a')],
    selectors: ['#demo-informational'],
  }),
  scenario('State focus link in positive', {
    actions: [focus('#demo-positive a')],
    selectors: ['#demo-positive'],
  }),
  scenario('State focus link in negative', {
    actions: [focus('#demo-negative a')],
    selectors: ['#demo-negative'],
  }),
  scenario('State focus link in warning', {
    actions: [focus('#demo-warning a')],
    selectors: ['#demo-warning'],
  }),
  scenario('Top start placement', {
    clickSelector: [click('#top-start-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
  scenario('Top placement', {
    clickSelector: [click('#top-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
  scenario('Top end placement', {
    clickSelector: [click('#top-end-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
  scenario('Bottom start placement', {
    actions: [click('#bottom-start-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
  scenario('Bottom placement', {
    actions: [click('#bottom-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
  scenario('Bottom end placement', {
    actions: [click('#bottom-end-option')],
    selectors: ['document'],
    postInteractionWait: 200,
  }),
];
