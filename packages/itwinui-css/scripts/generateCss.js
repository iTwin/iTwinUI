/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const path = require('path');
const sass = require('sass-embedded');
const css = require('lightningcss');
const postcss = require('postcss');
const postcssScoper = require('postcss-scoper');
const targets = require('./lightningCssSettings').targets;

const { yellow, green, red } = require('./utils');

const inDir = process.argv[2];
const outDir = process.argv[3];

const ignorePaths = ['.DS_Store', 'style'];

const compileScss = async (path, outFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sassOutput = await sass.compileAsync(path);
      const outFilename = `${outFile}.css`;

      const processedOutput = css.transform({
        filename: outFilename,
        code: Buffer.from(sassOutput.css),
        minify: true,
        targets,
      }).code;

      let finalOutput = processedOutput;

      if (!['all.css', 'global.css'].includes(outFilename)) {
        finalOutput = postcss([
          postcssScoper({
            scope: ':where(.iui-root, [data-iui-theme])',
          }),
        ]).process(processedOutput).css;
      }

      fs.writeFileSync(`${outDir}/${outFilename}`, finalOutput);
      console.log(` Wrote -> ${outFilename}`);
      resolve(finalOutput);
    } catch (error) {
      reject(`${error}\n in ${path}`);
    }
  });
};

const run = async () => {
  const files = await fs.promises.readdir(inDir, { withFileTypes: true });
  const directories = files.filter((f) => f.isDirectory()).map((f) => f.name);

  let allCss = ''; // we'll append all outputs to all.css

  const globalCss = await compileScss(`${inDir}/global.scss`, 'global');
  allCss += globalCss;

  for (const directory of directories) {
    if (!ignorePaths.includes(directory) && fs.existsSync(path.join(inDir, directory, 'classes.scss'))) {
      const outCss = await compileScss(`${inDir}/${directory}/classes.scss`, directory);
      allCss += outCss;
    }
  }

  fs.writeFileSync(`${outDir}/all.css`, allCss);
  console.log(` Wrote -> all.css`);

  console.log(green(`Converted all SCSS files to CSS.`));
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
