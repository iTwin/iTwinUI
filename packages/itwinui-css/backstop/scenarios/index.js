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
  // labelStrings = darkScenario.label.split('_');
  // labelStrings.splice(1, 0, 'dark');
  // darkScenario.label = labelStrings.join('_');
  darkScenario.label = `${darkScenario.label}_dark`;
  return darkScenario;
});

const highContrastDarkScenarios = scenarios.map((s) => {
  const hcDarkScenario = Object.assign({}, s);
  hcDarkScenario.label = `${hcDarkScenario.label}_hc_dark`;
  return hcDarkScenario;
});

// module.exports = scenarios
//   .concat(highContrastLightScenarios, darkScenarios, highContrastDarkScenarios)
//   .sort(function (a, b) {
//     const labelA = a.label.toUpperCase();
//     const labelB = b.label.toUpperCase();
//     return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
//   });

module.exports = lightScenarios.concat(highContrastLightScenarios, darkScenarios, highContrastDarkScenarios);

//!! instead of sorting alphabetically with theme after component name, put theme in front of component name but have a custom sort to put all the same test together?
