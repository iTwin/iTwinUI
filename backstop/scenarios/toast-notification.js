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
    actions: [click('#top-start-option')],
    selectors: ['#toast-notifications-test'],
  }),
  scenario('Top placement', {
    actions: [click('#top-option')],
    selectors: ['#toast-notifications-test'],
  }),
  scenario('Top end placement', {
    actions: [click('#top-end-option')],
    selectors: ['#toast-notifications-test'],
  }),
  scenario('Bottom start placement', {
    actions: [click('#bottom-start-option')],
    selectors: ['#toast-notifications-test'],
  }),
  scenario('Bottom placement', {
    actions: [click('#bottom-option')],
    selectors: ['#toast-notifications-test'],
  }),
  scenario('Bottom end placement', {
    actions: [click('#bottom-end-option')],
    selectors: ['#toast-notifications-test'],
  }),
];
