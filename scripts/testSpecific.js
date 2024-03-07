/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('node:child_process');

try {
  const componentName = process.argv[2];

  if (!componentName) {
    spawn('turbo run test', {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    spawn(
      `conc -g "pnpm run --filter css-workshop test --filter=${componentName}" "pnpm --filter=@itwin/itwinui-react run test:unit ${componentName}" "pnpm --filter "./testing/a11y" run test  --env componentName=${componentName}" "pnpm run --filter react-workshop test --spec="**/${componentName}.*""`,
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  }
} catch {
  console.log('Tests Failed');
}
