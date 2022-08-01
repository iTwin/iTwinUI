module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./overrideCss')(page, scenario);

  if (scenario.label.startsWith('dark_')) {
    await page.evaluate(() => (document.documentElement.dataset.iuiTheme = 'dark'));
  }
  await require('./browserActionsHelper')(page, scenario);

  // add more ready handlers here...
};
