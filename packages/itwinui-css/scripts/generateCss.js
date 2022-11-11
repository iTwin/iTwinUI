/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const sass = require('sass-embedded');
const css = require('lightningcss');
const targets = require('./lightningCssSettings').targets;

const { yellow, green, red } = require('./utils');

const inDir = process.argv[2];
const outDir = process.argv[3];

const ignorePaths = ['.DS_Store', 'style'];

const compileScss = async (path, outFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sassOutput = await sass.compileAsync(path);

      const processedOutput = css.transform({
        filename: `${outFile}.css`,
        code: Buffer.from(sassOutput.css),
        minify: true,
        targets,
      });

      fs.writeFileSync(`${outDir}/${outFile}.css`, processedOutput.code);
      console.log(` Wrote -> ${outFile}.css`);
      resolve();
    } catch (error) {
      reject(`${error}\n in ${path}`);
    }
  });
};

const run = async () => {
  const files = await fs.promises.readdir(inDir, { withFileTypes: true });
  const directories = files.filter((f) => f.isDirectory()).map((f) => f.name);
  const promiseList = [];
  promiseList.push(compileScss(`${inDir}/all.scss`, 'all'));
  promiseList.push(compileScss(`${inDir}/global.scss`, 'global'));

  for (const directory of directories) {
    if (!ignorePaths.includes(directory) && fs.existsSync(path.join(inDir, directory, 'classes.scss'))) {
      promiseList.push(compileScss(`${inDir}/${directory}/classes.scss`, directory));
    }
  }

  await Promise.all(promiseList);
  console.log(green(`Converted ${promiseList.length} files to CSS.`));
};

const main = async () => {
  console.log(yellow('Compiling SCSS to CSS'));
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    await run();
  } catch (error) {
    console.log(red(`Error converting files to CSS: ${error}`));
    process.exit(1);
  }
};

main();
