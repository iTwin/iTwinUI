/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const fg = require('fast-glob');

const pattern = process.argv.slice(2).filter((x) => x !== '--fix');
const filePaths = fg.sync(pattern, {
  dot: true,
  ignore: [
    '**/node_modules',
    '**/backstop/**/*.{js,css}',
    '**/backstop/minified',
    '**/backstop/results',
  ],
});

const copyrightLine1 = `Copyright (c) Bentley Systems, Incorporated. All rights reserved.`;
const copyrightLine2 = `See LICENSE.md in the project root for license terms and full copyright notice.`;

const copyrightBannerScss = `// ${copyrightLine1}\n// ${copyrightLine2}`;
const copyrightBannerHtml = `<!--\n  ${copyrightLine1}\n  ${copyrightLine2}\n-->`;
const copyrightBannerJs =
  '/*---------------------------------------------------------------------------------------------\n ' +
  `* ${copyrightLine1}\n ` +
  `* ${copyrightLine2}\n ` +
  '*--------------------------------------------------------------------------------------------*/';

if (filePaths) {
  filePaths.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    if (
      !fileContent.includes(copyrightLine1) &&
      !fileContent.includes(copyrightLine2)
    ) {
      if (process.argv.includes('--fix')) {
        switch (filePath.substring(filePath.lastIndexOf('.'))) {
          case '.js':
          case '.ts':
          case '.css':
            fs.writeFileSync(filePath, `${copyrightBannerJs}\n${fileContent}`);
            break;
          case '.html':
            fs.writeFileSync(
              filePath,
              `${copyrightBannerHtml}\n${fileContent}`
            );
            break;
          case '.scss':
            fs.writeFileSync(
              filePath,
              `${copyrightBannerScss}\n${fileContent}`
            );
            break;
        }
      } else {
        process.exitCode = 1;
        console.log(`copyrightLinter.js failed at ${filePath}`);
      }
    }
  });
}

module.exports = {
  copyrightBannerScss,
  copyrightBannerHtml,
  copyrightBannerJs,
};
