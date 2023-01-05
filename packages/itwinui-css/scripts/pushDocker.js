/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('child_process');
// Change this before new image push
const VERSION = '1.0.0';

spawn(
  `docker buildx build backstop/docker --platform linux/arm64/v8,linux/amd64 -t bentleysystemsinc/itwinui-backstop:latest -t bentleysystemsinc/itwinui-backstop:${VERSION} --push`,
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
