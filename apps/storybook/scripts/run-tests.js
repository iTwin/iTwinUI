/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const spawn = require('child_process').spawn;
const args = process.argv.slice(2).join(' ');
const os = require('os');
const imagePlatformName = os.arch().includes('arm') ? 'arm' : 'amd';

// Need to use this script because current directory variable is different in different shells
const dockerProcess = spawn(
  // --rm - removes container after run
  // --entrypoint /bin/bash - overrides the default entrypoint (command that is ran) of the cypress image
  // -v "${__dirname}/../../..":/e2e - mount monorepo root directory from host (your PC) to container
  // -w /e2e - makes `e2e` the working directory
  // scripts/entrypoint.sh - entrypoint script to run
  // args - cli args to forward to entrypoint scripts, e.g. for testing only one component using --spec Component.test.ts
  `docker run --rm --entrypoint /bin/bash -v "${__dirname}/../../..":/e2e -w /e2e bentleysystemsinc/itwinui-cypress:${imagePlatformName} apps/storybook/scripts/entrypoint.sh ${args}`,
  {
    stdio: 'inherit',
    shell: true,
  },
);
dockerProcess.on('error', (error) => {
  process.exitCode = 1;
  console.error(`Tests run failed with error: ${error}`);
});
dockerProcess.on('exit', (code) => {
  if (code !== 0) {
    process.exitCode = code;
    console.error(`Tests run failed with code: ${code}`);
  }
});
