/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import { exec } from 'node:child_process';

// This creates a dummy package.json file in the cjs folder.
// Without this, all cjs files would need the .cjs extension
// because .js files are treated as ESM according to the main package.json's "type".
try {
  fs.writeFileSync('cjs/package.json', '{ "type": "commonjs" }');
} catch (e) {
  console.error('Cannot create cjs/package.json', e);
}

// Run prettier on all compiled output because it gets jumbled by tsc.
exec('yarn prettier --write "{esm,cjs}/**/*.js"', (error) => {
  if (error) {
    console.error('Error when running prettier', error);
  } else {
    console.log('✓ Finished compiling @itwin/itwinui-react');
  }
});
