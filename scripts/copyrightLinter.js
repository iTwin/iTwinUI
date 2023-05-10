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
  pattern = '**/*.{ts,tsx,js,scss}';
}

const filePaths = fg.sync(pattern, {
  dot: true,
  ignore: [
    '**/node_modules/**/*',
    '**/backstop/**/*.{css}',
    '**/backstop/minified',
    '**/backstop/results',
    '**/coverage/**/*',
    '**/esm/**/*',
    '**/cjs/**/*',
    '**/dist/**/*',
    '**/storybook-static/**/*',
    '**/playgrounds/**/*',
    '**/cra-sandbox/**/*',
  ],
});

const copyrightLine1 = `Copyright (c) Bentley Systems, Incorporated. All rights reserved.`;
const copyrightLine2 = `See LICENSE.md in the project root for license terms and full copyright notice.`;

const copyrightBannerScss = `// ${copyrightLine1}\n// ${copyrightLine2}`;
const copyrightBannerHtml = `<!--\n  ${copyrightLine1}\n  ${copyrightLine2}\n-->`;
const copyrightBannerJs =
  '/*---------------------------------------------------------------------------------------------\n' +
  ` * ${copyrightLine1}\n` +
  ` * ${copyrightLine2}\n` +
  ' *--------------------------------------------------------------------------------------------*/';

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
            if (fileContent.startsWith('@charset')) {
              // @charset must be the first line in the file so insert the copyright banner after it
              fs.writeFileSync(
                filePath,
                fileContent.replace(
                  '@charset "UTF-8";',
                  `@charset "UTF-8";\n${copyrightBannerJs}`,
                ),
              );
            } else {
              fs.writeFileSync(
                filePath,
                `${copyrightBannerJs}\n${fileContent}`,
              );
            }
            break;
          case '.html':
            fs.writeFileSync(
              filePath,
              `${copyrightBannerHtml}\n${fileContent}`,
            );
            break;
          case '.scss':
            fs.writeFileSync(
              filePath,
              `${copyrightBannerScss}\n${fileContent}`,
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
