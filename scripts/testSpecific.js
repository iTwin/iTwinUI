/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('node:child_process');

// ['src/**/*.test.ts?(x)']
// after scanning for valid component anmes comapre the arguement to that array if valid pass onto concurrenly
// if not check if -- if -- then just pass the whole thing down thel ine and if not error 'not valid component name'

try {
  const arguement = process.argv[2];
  const secondArguement = process.argv[3] ? process.argv[3] : '';
  const baseCmd = 'turbo run test';

  if (!arguement) {
    spawn(`${baseCmd}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else if (arguement.includes('--filter')) {
    spawn(`${baseCmd} ${arguement} ${secondArguement}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    spawn(
      `conc -g -r "pnpm --filter=css-workshop run test --filter=${arguement.toLowerCase()}" "pnpm --filter=@itwin/itwinui-react run test:unit ${arguement}" "pnpm --filter "./testing/a11y" run test  --env componentName=${arguement}" "pnpm --filter=react-workshop run test --spec="**/${arguement}.*""`,
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  }
} catch {
  console.log('Tests Failed');
}
