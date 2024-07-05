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

    // We cannot (currently) use the new JSX transform, because it relies on ESM exports
    // which are not available in React 17. See https://github.com/facebook/react/issues/20235
    // 'jsc.transform.react.runtime=automatic',

    'jsc.target=es2020',
    'jsc.minify.format.comments=false',
    'jsc.externalHelpers=true',

    'jsc.minify.compress.defaults=false', // Disable default compress options
    'jsc.minify.compress.dead_code=true', // Remove dead code (useful for removing NODE_ENV checks in production)
  ].join(' -C '),

  get esm() {
    return [
      this.shared,
      this.compilerOptions,
      '-C module.type=es6',
      `-C jsc.transform.optimizer.globals.vars.__module="\'ESM\'"`,
    ].join(' ');
  },

  get cjs() {
    return [
      this.shared,
      this.compilerOptions,
      '-C module.type=commonjs',
      `-C jsc.transform.optimizer.globals.vars.__module="\'CJS\'"`,
    ].join(' ');
  },
};

// ----------------------------------------------------------------------------

execSync(`pnpm swc src -d DEV-esm ${swcOptions.esm}`, {
  env: { ...process.env, NODE_ENV: 'development' },
});
console.log('✓ Built esm (DEV).');

execSync(`pnpm swc src -d DEV-cjs ${swcOptions.cjs}`, {
  env: { ...process.env, NODE_ENV: 'development' },
});
console.log('✓ Built cjs (DEV).');

execSync(`pnpm swc src -d esm ${swcOptions.esm}`, {
  env: { ...process.env, NODE_ENV: 'production' },
});
console.log('✓ Built esm.');

execSync(`pnpm swc src -d cjs ${swcOptions.cjs}`, {
  env: { ...process.env, NODE_ENV: 'production' },
});
console.log('✓ Built cjs.');
