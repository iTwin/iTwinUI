/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { exec } = require('child_process');

const runTests = () => {
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
      command: `cd ./packages/itwinui-react/src/core && pnpm run test:unit --mode ${componentName} && cd ../../../../..`,
    },
    {
      type: 'A11y',
      command: `cd ./testing/a11y && pnpm cypress run --component --spec "src/SpecificComponent.cy.tsx" --env componentName=${componentName}`,
    },
  ];

  const runCommand = (type, command) => {
    return new Promise((resolve) => {
      console.log(`${type} tests are running`);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.log(`\x1b[31m${type} test failed\x1b[0m`);
          console.error(stderr);
          resolve('\x1b[31mFailure\x1b[0m');
        } else {
          console.log(`\x1b[32m${type} test was successful\x1b[0m`);
          console.log(stdout);
          resolve('\x1b[32mSuccess\x1b[0m');
        }
      });
    });
  };

  /*
why doesnt react visual testing always work?
how important are capitals and how can i fix that
 get more detailed information for errors and postive
 */

  Promise.all(
    commands.map(({ type, command }) => runCommand(type, command)),
  ).then((results) => {
    const [reactResult, cssResult, unitResult, a11yResult] = results;

    console.log('-------------------------------');
    console.log('      Test      |     Result   ');
    console.log('-------------------------------');
    console.log(`React Workshop  |    ${reactResult}`);
    console.log(`CSS Workshop    |    ${cssResult}`);
    console.log(`Unit            |    ${unitResult}`);
    console.log(`A11y            |    ${a11yResult}`);
    console.log('-------------------------------');
  });
};

runTests();
