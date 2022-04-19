/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const os = require('os');
const { spawn } = require('child_process');

const platform = os.arch().includes('arm') ? 'linux/arm64/v8' : 'linux/amd64';

spawn(`docker buildx build backstop/docker --platform ${platform} -t itwinui/backstopjs:latest --load`, {
  stdio: 'inherit',
  shell: true,
})
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
