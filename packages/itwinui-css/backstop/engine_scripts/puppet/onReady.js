module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./overrideCss')(page, scenario);

  if (scenario.label.endsWith('_light')) {
    await page.evaluate(() => (document.documentElement.dataset.iuiTheme = 'light'));
  } else if (scenario.label.endsWith('_dark')) {
    await page.evaluate(() => (document.documentElement.dataset.iuiTheme = 'dark'));
  }
  if (scenario.label.endsWith('_hc_light') || scenario.label.endsWith('_hc_dark')) {
    await page.evaluate(() => (document.documentElement.dataset.iuiContrast = 'high'));
  }
  await require('./browserActionsHelper')(page, scenario);

  // add more ready handlers here...
};
