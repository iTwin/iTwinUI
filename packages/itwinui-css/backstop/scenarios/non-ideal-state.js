const { scenario } = require('../scenarioHelper');

module.exports = [
  scenario('401', { selectors: ['#nis-401 .iui-non-ideal-state'] }),
  scenario('403', { selectors: ['#nis-403 .iui-non-ideal-state'] }),
  scenario('404', { selectors: ['#nis-404 .iui-non-ideal-state'] }),
  scenario('500', { selectors: ['#nis-500 .iui-non-ideal-state'] }),
  scenario('502', { selectors: ['#nis-502 .iui-non-ideal-state'] }),
  scenario('503', { selectors: ['#nis-503 .iui-non-ideal-state'] }),
  scenario('error', { selectors: ['#nis-error .iui-non-ideal-state'] }),
  scenario('timed-out', { selectors: ['#nis-timed-out .iui-non-ideal-state'] }),
  scenario('redirect', { selectors: ['#nis-redirect .iui-non-ideal-state'] }),
  scenario('multi-redirect', {
    selectors: ['#nis-multi-redirect .iui-non-ideal-state'],
  }),
];
