/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs/promises';
import path from 'node:path';

const dirname = path.dirname(new URL(import.meta.url).pathname);

const root = path.join(dirname, '..');
const srcDir = path.resolve(root, 'src');
const distDir = path.resolve(srcDir, 'styles.js', 'dist');
const distEsmDir = path.resolve(distDir, 'esm');
const distCjsDir = path.resolve(distDir, 'cjs');
const outCjsDir = path.resolve(root, 'cjs');
const outEsmDir = path.resolve(root, 'esm');

// copy styles.js from src/styles.js/dist into cjs/styles.js and esm/styles.js
await fs.copyFile(
  path.join(distEsmDir, 'styles.js'),
  path.join(outEsmDir, 'styles.js'),
);
await fs.copyFile(
  path.join(distCjsDir, 'styles.js'),
  path.join(outCjsDir, 'styles.js'),
);

// copy styles.js/dist/styles.css into root
await fs.copyFile(
  path.join(distDir, 'styles.css'),
  path.join(root, 'styles.css'),
);

// copy styles.d.ts from src into cjs and esm
await fs.copyFile(
  path.join(srcDir, 'styles.d.ts'),
  path.join(outEsmDir, 'styles.d.ts'),
);
await fs.copyFile(
  path.join(srcDir, 'styles.d.ts'),
  path.join(outCjsDir, 'styles.d.ts'),
);
