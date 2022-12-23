/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const os = require('os');
const path = require('path');
const spawn = require('child_process').spawn;

const dockerfilePath = path.join(__dirname, 'docker');
const platform = os.arch().includes('arm') ? 'linux/arm64/v8' : 'linux/amd64';
const binaryPath = os.arch().includes('arm')
  ? '/tmp/cypress-build/linux/build/linux-arm64-unpacked'
  : '/tmp/cypress-build/linux/build/linux-unpacked';
const imagePlatformName = os.arch().includes('arm') ? 'arm' : 'amd';
// Change this before new image push
const VERSION = '1.0.0';

spawn(
  `docker buildx build ${dockerfilePath} --platform ${platform} --build-arg BINARY_PATH=${binaryPath} -t bentleysystemsinc/itwinui-cypress:${imagePlatformName} -t bentleysystemsinc/itwinui-cypress:${VERSION}-${imagePlatformName} --push`,
  {
    stdio: 'inherit',
    shell: true,
  },
)
  .on('error', (error) => {
    process.exitCode = 1;
    console.error(`docker buildx failed with error: ${error}`);
  })
  .on('exit', (code) => {
    if (code !== 0) {
      process.exitCode = code;
      console.error(`docker buildx failed with code: ${code}`);
    }
  });
