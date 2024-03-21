/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./overrideCss.cjs')(page, scenario);

  if (scenario.label.endsWith('_light')) {
    await page.evaluate(() => (document.body.dataset.iuiTheme = 'light'));
  } else if (scenario.label.endsWith('_dark')) {
    await page.evaluate(() => (document.body.dataset.iuiTheme = 'dark'));
  }
  if (
    scenario.label.endsWith('_hc_light') ||
    scenario.label.endsWith('_hc_dark')
  ) {
    await page.evaluate(() => (document.body.dataset.iuiContrast = 'high'));
  }
  await require('./browserActionsHelper.cjs')(page, scenario);

  // add more ready handlers here...
};
