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

const outEsmPath = path.join(__dirname, '..', 'esm', 'styles.js');
const outCjsPath = path.join(__dirname, '..', 'cjs', 'styles.js');

if (fs.existsSync(outEsmPath)) {
  await fs.promises.unlink(outEsmPath);
}

if (fs.existsSync(outCjsPath)) {
  await fs.promises.unlink(outCjsPath);
}

await fs.promises.writeFile(outEsmPath, `export default \`${rawCssText}\`;`);
await fs.promises.writeFile(outCjsPath, `module.exports=\`${rawCssText}\`;`);
