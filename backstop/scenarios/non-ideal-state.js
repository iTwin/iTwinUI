const { scenario } = require('../scenarioHelper');

module.exports = [
  // Types
  scenario('Type 401', { selectors: ['#nis-401 .iui-non-ideal-state'] }),
  scenario('Type 403', { selectors: ['#nis-403 .iui-non-ideal-state'] }),
  scenario('Type 404', { selectors: ['#nis-404 .iui-non-ideal-state'] }),
  scenario('Type 500', { selectors: ['#nis-500 .iui-non-ideal-state'] }),
  scenario('Type 502', { selectors: ['#nis-502 .iui-non-ideal-state'] }),
  scenario('Type 503', { selectors: ['#nis-503 .iui-non-ideal-state'] }),
  scenario('Type error', { selectors: ['#nis-error .iui-non-ideal-state'] }),
  scenario('Type redirect', {
    selectors: ['#nis-redirect .iui-non-ideal-state'],
  }),
  scenario('Type multi-redirect', {
    selectors: ['#nis-multi-redirect .iui-non-ideal-state'],
  }),
];
