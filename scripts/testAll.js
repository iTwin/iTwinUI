/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const runTests = () => {
  const componentName = process.argv[2];
  const componentDir = findDir(
    './packages/itwinui-react/src/core',
    `${componentName}.tsx`,
  );
  console.log(componentDir);

  const runCommand = (type, command) => {
    console.log(`${type} tests are running`);

    if (!componentName) {
      console.error('Please provide a component name');
      process.exit(1);
    }

    try {
      execSync(command);
      return '\x1b[32mSuccess\x1b[0m';
    } catch (error) {
      console.log(`${type} test failed`);
      console.error(error);
      return '\x1b[31mFailure\x1b[0m';
    }
  };

  /*
figure out how to find the correct file when needed for unit testing
why doesnt react visual testing always work?
how important are capitals and how can i fix that
 get more detailed information for errors and postive
 */

  function findDir(startPath, targetFile) {
    if (!fs.existsSync(startPath)) {
      console.log(`Directory not found: ${startPath}`);
      return false;
    }

    const files = fs.readdirSync(startPath);

    for (const file of files) {
      const filePath = path.join(startPath, file);
      const stat = fs.lstatSync(filePath);
      const fullPath = path.join(startPath, file, targetFile);
      // console.log(filePath);

      if (fs.existsSync(fullPath)) {
        // console.log(test);
        // console.log(filePath);
        return filePath;
      } else if (stat.isDirectory()) {
        findDir(filePath, targetFile);
      }
    }
  }

  const reactResult = runCommand(
    'React Visual',
    `pnpm run --filter react-workshop test --spec="**/${componentName}.*"`,
  );
  const cssResult = runCommand(
    'CSS Visual',
    `pnpm run --filter css-workshop test --filter=${componentName}`,
  );
  const unitResult = runCommand(
    'Unit',
    `cd ${componentDir} && pnpm run test:unit && cd ../../../../..`,
  );
  const a11yResult = runCommand(
    'A11y',
    `cd ./testing/a11y && pnpm cypress run --component --spec "src/SpecificComponent.cy.tsx" --env componentName=${componentName}`,
  );

  console.log('-------------------------------');
  console.log('      Test      |     Result   ');
  console.log('-------------------------------');
  console.log(`React Workshop  |    ${reactResult}`);
  console.log(`CSS Workshop    |    ${cssResult}`);
  console.log(`Unit            |    ${unitResult}`);
  console.log(`A11y            |    ${a11yResult}`);
  console.log('-------------------------------');
};

runTests();
