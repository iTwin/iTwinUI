/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { execSync } from 'node:child_process';

// https://swc.rs/docs/usage/cli
const swcOptions = {
  shared: [
    '--strip-leading-paths',
    '--no-swcrc',
    '--ignore **/*.test.*,**/styles.js/*,**/styles*',
  ].join(' '),

  // https://swc.rs/docs/configuration/compilation
  compilerOptions: [
    '',
    'jsc.parser.syntax=typescript',
    'jsc.parser.tsx=true',
    'jsc.transform.react.useBuiltins=true',
    'jsc.target=es2020',
    'jsc.minify.format.comments=false',
    'jsc.externalHelpers=true',
  ].join(' -C '),

  get esm() {
    return [this.shared, this.compilerOptions, '-C module.type=es6'].join(' ');
  },

  get cjs() {
    return [this.shared, this.compilerOptions, '-C module.type=commonjs'].join(
      ' ',
    );
  },
};

execSync(`pnpm swc src -d esm ${swcOptions.esm}`);
console.log('✓ Built esm.');

execSync(`pnpm swc src -d cjs ${swcOptions.cjs}`);
console.log('✓ Built cjs.');
