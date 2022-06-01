const scenarios = require('./scenarios');

const config = {
  id: 'iTwinUI',
  engineOptions: {
    args: ['--no-sandbox'],
    executablePath: '/usr/bin/chromium',
    ignoreDefaultArgs: ['--hide-scrollbars'],
  },
  viewports: [
    {
      label: 'desktop',
      width: 1920,
      height: 1080,
    },
  ],
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios: scenarios,
  paths: {
    bitmaps_reference: 'backstop/results/bitmaps_reference',
    bitmaps_test: 'backstop/results/bitmaps_test',
    engine_scripts: 'backstop/engine_scripts',
    html_report: 'backstop/results/html_report',
    ci_report: 'backstop/results/ci_report',
  },
  report: ['CI'],
  engine: 'puppeteer',
  asyncCaptureLimit: 10,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  dockerCommandTemplate:
    'docker run --rm -i --mount type=bind,source="{cwd}",target=/src itwinui/backstopjs:latest {backstopCommand} {args}',
};

module.exports = config;
