// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
const fs = require('fs');
const fg = require('fast-glob');

const pattern = process.argv.filter((x) => x !== '--fix');
const filePaths = fg.sync(pattern, {
  dot: true,
  ignore: [
    'node_modules/**/*',
    'coverage/**/*',
    'lib/**/*',
    'storybook-static/**/*',
  ],
});

const copyrightBanner = `// Copyright (c) Bentley Systems, Incorporated. All rights reserved.`;

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
