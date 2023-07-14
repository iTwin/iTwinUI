/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const readPackageOnDisk = (pkg) =>
  fs.promises.readFile(require.resolve(pkg), 'utf-8');

const rawCssText =
  '@charset "utf-8";\n' +
  (await readPackageOnDisk('@itwin/itwinui-variables')) +
  (await readPackageOnDisk('@itwin/itwinui-css'));

const outEsmDir = path.join(__dirname, '..', 'esm');
const outEsmPath = path.join(outEsmDir, 'styles.js');

const outCjsDir = path.join(__dirname, '..', 'cjs');
const outCjsPath = path.join(outCjsDir, 'styles.js');

if (!fs.existsSync(outEsmDir)) {
  await fs.promises.mkdir(outEsmDir);
}

if (!fs.existsSync(outCjsDir)) {
  await fs.promises.mkdir(outCjsDir);
}

if (fs.existsSync(outEsmPath)) {
  await fs.promises.unlink(outEsmPath);
}

if (fs.existsSync(outCjsPath)) {
  await fs.promises.unlink(outCjsPath);
}

await fs.promises.writeFile(outEsmPath, `export default \`${rawCssText}\`;`);
await fs.promises.writeFile(outCjsPath, `module.exports=\`${rawCssText}\`;`);
