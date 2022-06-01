const { ScenarioActions } = require('../../scenarioHelper');

async function performAction(page, action) {
  switch (action.type) {
    case ScenarioActions.Click: {
      await page.waitForSelector(action.value);
      await page.evaluate((selector) => document.querySelector(selector).click(), action.value);
      break;
    }
    case ScenarioActions.Hover: {
      await page.waitForSelector(action.value);
      await page.hover(action.value);
      break;
    }
    case ScenarioActions.Focus: {
      await page.waitForSelector(action.value);
      await page.evaluate((selector) => document.querySelector(selector).focus(), action.value);
      break;
    }
    case ScenarioActions.KeyPress: {
      await page.waitForSelector(action.value.selector);
      await page.type(action.value.selector, action.value.keys);
      break;
    }
    default:
      throw `Unknown action type: ${action.type}`;
  }
}

module.exports = async (page, scenario) => {
  const actions = scenario.actions || [];
  for (let action of actions) {
    await performAction(page, action);
    await page.waitForTimeout(scenario.postInteractionWait);
  }

  await page.waitForTimeout(scenario.postInteractionWait);

  const scrollToSelector = scenario.scrollToSelector;
  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate((scrollToSelector) => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
