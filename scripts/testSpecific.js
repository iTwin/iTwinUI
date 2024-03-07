/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('child_process');

function runTests() {
  const componentName = process.argv[2];

  if (!componentName) {
    console.error('Please provide a component name');
    process.exit(1);
  }

  const commands = [
    {
      type: 'React Visual',
      command: `pnpm run --filter react-workshop test --spec="**/${componentName}.*"`,
    },
    {
      type: 'CSS Visual',
      command: `pnpm run --filter css-workshop test --filter=${componentName}`,
    },
    {
      type: 'Unit',
      command: `pnpm --filter=@itwin/itwinui-react run test:unit ${componentName}`,
    },
    {
      type: 'A11y',
      command: `pnpm --filter "./testing/a11y" --env componentName=${componentName} run test`,
    },
  ];

  commands.forEach(({ type, command }) => {
    spawn(command, {
      stdio: 'inherit',
      shell: true,
    });
  });
}

runTests();
