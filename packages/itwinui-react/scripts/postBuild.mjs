/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// This creates a dummy package.json file in the cjs and DEV-cjs folders.
// Without this, all cjs files would need the .cjs extension
// because .js files are treated as ESM according to the main package.json's "type".
try {
  fs.writeFileSync('cjs/package.json', '{ "type": "commonjs" }');
  fs.writeFileSync('DEV-cjs/package.json', '{ "type": "commonjs" }');
} catch (e) {
  console.error('Cannot create package.json', e);
}

// Run prettier on all compiled output because it gets jumbled by tsc.
try {
  execSync(
    'npx prettier --write --ignore-path="../../.gitignore" "{esm,cjs,DEV-esm,DEV-cjs}/**/*.js"',
  );
} catch (error) {
  console.error('Error when running prettier', error);
}

console.log('\x1b[32m✓ Finished building @itwin/itwinui-react');
