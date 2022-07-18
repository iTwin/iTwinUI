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
    scenario.url = `http://host.docker.internal:3000/${fileName}.html`;
  });
  scenarios = scenarios.concat(newScenarios);
});

const darkScenarios = scenarios.map((s) => {
  const darkScenario = Object.assign({}, s);
  darkScenario.label = `dark_${darkScenario.label}`;
  return darkScenario;
});

module.exports = scenarios.concat(darkScenarios);
