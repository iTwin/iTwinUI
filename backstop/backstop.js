const scenarios = require('./scenarios')

const config = {
  id: 'Bentley Web Components',
  engineOptions: {
    args: ['--no-sandbox'],
  },
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480,
    },
    {
      label: 'desktop',
      width: 1920,
      height: 1080,
    },
  ],
  onBeforeScript: '',
  onReadyScript: '',
  scenarios: scenarios,
  paths: {
    bitmaps_reference: 'backstop/results/bitmaps_reference',
    bitmaps_test: 'backstop/results/bitmaps_test',
    engine_scripts: 'backstop/results/engine_scripts',
    html_report: 'backstop/results/html_report',
    ci_report: 'backstop/results/ci_report',
  },
  report: ['CI'],
  engine: 'puppeteer',
  asyncCaptureLimit: 5,
  asyncCompareLimit: 5,
  debug: false,
  debugWindow: false,
  dockerCommandTemplate:
    'docker run --rm -i --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}',
}

module.exports = config
