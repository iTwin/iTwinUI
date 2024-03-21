/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const scenarios = require('./tests/index.cjs');

const isCI = process.env.CI === 'true';

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
  onBeforeScript: 'puppet/onBefore.cjs',
  onReadyScript: 'puppet/onReady.cjs',
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
  dockerCommandTemplate: `docker run --rm -i --add-host=host.docker.internal:host-gateway ${
    isCI ? '--user $(id -u):$(id -g) ' : ''
  } --mount type=bind,source="{cwd}",target=/src backstopjs/backstopjs:6.2.1 {backstopCommand} {args}`,
};

module.exports = config;
