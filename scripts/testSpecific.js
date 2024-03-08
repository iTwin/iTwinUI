/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('node:child_process');

try {
  const arguement = process.argv[2];
  const baseCmd = 'turbo run test';

  if (!arguement) {
    spawn(`${baseCmd}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else if (arguement.includes('--filter')) {
    spawn(`${baseCmd} ${arguement}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    spawn(
      `conc -g "pnpm turbo run --filter css-workshop test --filter=${arguement}" "pnpm --filter=@itwin/itwinui-react run test:unit ${arguement}" "pnpm --filter "./testing/a11y" run test  --env componentName=${arguement}" "${baseCmd} --filter react-workshop  --spec="**/${arguement}.*""`,
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  }
} catch {
  console.log('Tests Failed');
}
