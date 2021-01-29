function scenario(label, selector = 'html', misMatchThreshold = 0.1) {
  return {
    label: label,
    cookiePath: 'backstop/results/engine_scripts/cookies.json',
    url: `./backstop/tests/${label}.html`,
    referenceUrl: '',
    readyEvent: '',
    readySelector: selector,
    delay: 1000,
    hideSelectors: [],
    removeSelectors: [],
    hoverSelector: '',
    clickSelector: '',
    postInteractionWait: 0,
    selectors: [selector],
    selectorExpansion: true,
    expect: 0,
    misMatchThreshold: misMatchThreshold,
    requireSameDimensions: true,
  }
}

const scenarios = [
  scenario('alerts'),
  scenario('buttons'),
  scenario('expandable-blocks'),
  scenario('flextables'),
  scenario('inputs'),
  scenario('loaders', undefined, 1.5),
  scenario('non-ideal-state'),
  scenario('progress-indicators', undefined, 1.5),
  scenario('tabs'),
  scenario('tags'),
  scenario('tiles', '#tile'),
  scenario('tiles', '#featured'),
  scenario('tiles', '#minimal'),
  scenario('tiles', '#both'),
  scenario('toasts'),
  scenario('toggle-switch'),
  scenario('user-icons'),
  scenario('footer'),
  scenario('tooltips'),
  scenario('date-picker'),
  scenario('modal'),
]

module.exports = scenarios
