/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('node:child_process');
const fs = require('fs');
const path = require('path');
const concurrently = require('concurrently');

/**
 * Find all files inside a dir, recursively.
 * @function getComponentNames
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with every componentName that has a test file
 */
const getComponentNames = (dir = './packages/') =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    const regex = /\\([^\\]+)\.test\.ts(x?)$/;
    const match = name.match(regex);

    if (isDirectory) return [...files, ...getComponentNames(name)];
    else if (match) return [...files, match[1]];
    else return files;
  }, []);

try {
  const argument = process.argv[2];
  const componentNames = getComponentNames();

  if (componentNames.includes(argument)) {
    spawn(
      `conc -g -r --kill-others "pnpm --filter=css-workshop run test --filter=${argument.toLowerCase()}" "pnpm --filter=@itwin/itwinui-react run test:unit ${argument}" "pnpm --filter "./testing/a11y" run test  --env componentName=${argument}" "pnpm --filter=react-workshop run test --spec="**/${argument}.*""`,
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  } else if (argument) {
    spawn(`turbo run test ${argument}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    spawn(`turbo run test`, {
      stdio: 'inherit',
      shell: true,
    });
  }
} catch (error) {
  console.log(error);
}
