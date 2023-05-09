/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

import * as chokidar from 'chokidar';
import * as lightningCss from 'lightningcss';
import { targets } from './lightningCssSettings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');
const outDir = path.join(__dirname, '..', 'css');

const components = (await fs.promises.readdir(srcDir, { withFileTypes: true }))
  .filter((f) => f.isDirectory())
  .map((f) => f.name);

// array of tuples where [0] is the .scss source and [1] is the .css output
const inputsAndOutputsList = [
  ['src/all.scss', 'css/all.css'],
  ['src/global.scss', 'css/global.css'],
  ...components.map((name) => [`src/${name}/${name}.scss`, `css/${name}.css`]),
];

// sass cli expects this format (https://sass-lang.com/documentation/cli/dart-sass)
// src/all.scss:css/all.css src/alert/alert.scss:css/alert.css
const spaceSeparatedInputsAndOutputs = inputsAndOutputsList.map(([scss, css]) => `${scss}:${css}`).join(' ');

spawn(`yarn sass --watch ${spaceSeparatedInputsAndOutputs}`, {
  stdio: 'inherit',
  shell: true,
})
  .on('error', (error) => {
    process.exitCode = 1;
    console.error(`sass watch failed with error: ${error}`);
  })
  .on('exit', (code) => {
    if (code !== 0) {
      process.exitCode = code;
      console.error(`sass watch failed with code: ${code}`);
    }
  });

// run lightningcss every time sass produces a .css file.
// this overwrites the .css files which could cause an infinite loop,
// so we tell chokidar to only watch *.css.map files (not *.css)
chokidar.watch(`css/*.css.map`).on('all', (event, originalChangedFilename) => {
  if (event === 'add' || event === 'change') {
    const changedFilename = path.parse(originalChangedFilename).name; // css/alert.css.map -> alert.css
    const cssFilePath = path.join(outDir, changedFilename);
    const css = fs.readFileSync(cssFilePath, { encoding: 'utf8' });

    const { code } = lightningCss.transform({
      minify: false,
      sourceMap: false,
      code: Buffer.from(css),
      filename: changedFilename,
      targets,
    });

    fs.writeFileSync(cssFilePath, code, { encoding: 'utf8' });

    console.log(`Postprocessed ${changedFilename} using lightningcss`);
  }
});
