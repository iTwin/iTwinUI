module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./browserActionsHelper')(page, scenario);

  // add more ready handlers here...
};
