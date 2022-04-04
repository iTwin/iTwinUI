const scenarios = require('./scenarios');

// Using different image for M1 processors
const isM1 = process.argv.includes('--m1');
const dockerImage = isM1 ? `dockerman33/backstopjs:5.4.4` : `backstopjs/backstopjs:{version}`;

const config = {
  id: 'iTwinUI',
  engineOptions: {
    args: ['--no-sandbox'],
    ignoreDefaultArgs: ['--hide-scrollbars'],
    executablePath: isM1 ? '/usr/bin/chromium' : '',
    gotoTimeout: 60000,
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
  debug: true,
  debugWindow: false,
  //dockerCommandTemplate: `docker run --platform linux/amd64 --rm -i --mount type=bind,source="{cwd}",target=/src ${dockerImage} {backstopCommand} {args}`,
  dockerCommandTemplate: `docker buildx build --platform linux/arm64/v8 -t foo /Users/greta/Documents/code/repos/iTwinUI/backstop && docker run --rm -i --mount type=bind,source="{cwd}",target=/src foo {backstopCommand} {args}`,
};

module.exports = config;
