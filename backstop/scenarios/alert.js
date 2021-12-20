const { scenario, hover, focus } = require('../scenarioHelper');

module.exports = [
  // Alert types
  scenario('Type All', {
    hideSelectors: ['h1', 'hr', 'theme-button'],
    viewports: [{ width: 800, height: 600 }],
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
  scenario('State hover link in warning', {
    actions: [hover('#demo-warning a')],
    selectors: ['#demo-warning'],
  }),
  scenario('State hover link in negative', {
    actions: [hover('#demo-negative a')],
    selectors: ['#demo-negative'],
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
  scenario('State focus link in warning', {
    actions: [focus('#demo-warning a')],
    selectors: ['#demo-warning'],
  }),
  scenario('State focus link in negative', {
    actions: [focus('#demo-negative a')],
    selectors: ['#demo-negative'],
  }),
];
