const fs = require('fs');
const { click } = require('../scenarioHelper');

let scenarios = [];
fs.readdirSync('backstop/scenarios/').forEach((file) => {
  if (file === 'index.js') {
    return;
  }
  const fileName = file.replace('.js', '');
  const newScenarios = require(`./${fileName}`);
  newScenarios.forEach((scenario) => {
    scenario.label = `${fileName}_${scenario.label}`;
    scenario.url = `http://host.docker.internal:3050/${fileName}.html`;
  });
  scenarios = scenarios.concat(newScenarios);
});

const lightScenarios = scenarios.map((s) => {
  const lightScenario = Object.assign({}, s);
  lightScenario.label = `${lightScenario.label}_light`;
  return lightScenario;
});

const highContrastLightScenarios = scenarios.map((s) => {
  const hcLightScenario = Object.assign({}, s);
  hcLightScenario.label = `${hcLightScenario.label}_hc_light`;
  return hcLightScenario;
});

const darkScenarios = scenarios.map((s) => {
  const darkScenario = Object.assign({}, s);
  darkScenario.label = `${darkScenario.label}_dark`;
  return darkScenario;
});

const highContrastDarkScenarios = scenarios.map((s) => {
  const hcDarkScenario = Object.assign({}, s);
  hcDarkScenario.label = `${hcDarkScenario.label}_hc_dark`;
  return hcDarkScenario;
});

module.exports = lightScenarios.concat(highContrastLightScenarios, darkScenarios, highContrastDarkScenarios);
