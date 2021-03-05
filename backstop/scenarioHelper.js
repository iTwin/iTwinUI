function scenario(testCase, options = {}) {
  return Object.assign(
    {
      label: testCase,
      actions: [],
      referenceUrl: '',
      readyEvent: '',
      readySelector: '',
      delay: 1000,
      hideSelectors: [],
      removeSelectors: [],
      hoverSelector: '',
      clickSelector: '',
      postInteractionWait: 500,
      selectors: ['html'],
      selectorExpansion: true,
      expect: 0,
      misMatchThreshold: 0.001,
      requireSameDimensions: true,
    },
    options,
  );
}

const ScenarioActions = {
  Click: 'Click',
  Hover: 'Hover',
  Focus: 'Focus',
  KeyPress: 'KeyPress',
};

function click(selector) {
  return {
    type: ScenarioActions.Click,
    value: selector,
  };
}

function hover(selector) {
  return {
    type: ScenarioActions.Hover,
    value: selector,
  };
}

function focus(selector) {
  return {
    type: ScenarioActions.Focus,
    value: selector,
  };
}

function keyPress(selector, keys) {
  return {
    type: ScenarioActions.KeyPress,
    value: {
      selector,
      keys,
    },
  };
}

module.exports = {
  scenario,
  ScenarioActions,
  click,
  hover,
  focus,
  keyPress,
};
