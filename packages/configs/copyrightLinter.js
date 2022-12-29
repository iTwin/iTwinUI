/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const fg = require('fast-glob');

let pattern = process.argv
  .slice(2)
  .flatMap((x) => (x !== '--fix' ? x.replaceAll('\\', '/') : []));

// if no pattern is specified, then lint everything
if (pattern.length === 0) {
  pattern = '**/*.{ts,tsx,js}';
}

const filePaths = fg.sync(pattern, {
  dot: true,
  ignore: [
    '**/node_modules/**/*',
    '**/coverage/**/*',
    '**/esm/**/*',
    '**/cjs/**/*',
    '**/dist/**/*',
    '**/storybook-static/**/*',
    '**/playgrounds/**/*',
  ],
});

const copyrightBanner =
  '/*---------------------------------------------------------------------------------------------\n ' +
  '* Copyright (c) Bentley Systems, Incorporated. All rights reserved.\n ' +
  '* See LICENSE.md in the project root for license terms and full copyright notice.\n ' +
  '*--------------------------------------------------------------------------------------------*/';

if (filePaths) {
  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    if (!fileContent.startsWith(copyrightBanner)) {
      if (process.argv.includes('--fix')) {
        fs.writeFileSync(filePath, `${copyrightBanner}\n${fileContent}`);
      } else {
        process.exitCode = 1;
        console.log(`copyrightLinter.js failed at ${filePath}`);
      }
    }
  });
}
