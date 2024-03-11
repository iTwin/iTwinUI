/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const { spawn } = require('node:child_process');
var fs = require('fs');
const path = require('path');

// ['src/**/*.test.ts?(x)']
// after scanning for valid component anmes comapre the argument to that array if valid pass onto concurrenly
// if not check if -- if -- then just pass the whole thing down thel ine and if not error 'not valid component name'

try {
  /**
   * Find
   *
   *
   */

  const argument = process.argv[2];
  const secondArguement = process.argv[3] ? process.argv[3] : '';
  const baseCmd = 'turbo run test';

  /**
   * Find all files inside a dir, recursively.
   * @function getAllFiles
   * @param  {string} dir Dir path string.
   * @return {string[]} Array with all file names that are inside the directory.
   */

  const getAllFiles = (dir) =>
    fs.readdirSync(dir).reduce((files, file) => {
      const name = path.join(dir, file);
      const isDirectory = fs.statSync(name).isDirectory();

      return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
    }, []);

  console.log(getAllFiles('./packages/itwinui-react/src/core'));

  if (!argument) {
    spawn(`${baseCmd}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else if (argument.includes('--filter')) {
    spawn(`${baseCmd} ${argument} ${secondArguement}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else {
    spawn(
      [
        `conc -g -r "pnpm --filter=css-workshop run test --filter=${argument.toLowerCase()}" "pnpm --filter=@itwin/itwinui-react run test:unit ${argument}" "pnpm --filter "./testing/a11y" run test  --env componentName=${argument}" "pnpm --filter=react-workshop run test --spec="**/${argument}.*""`,
      ],
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  }
} catch (error) {
  console.log(error);
}
