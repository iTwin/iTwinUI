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

  // swc does not inline `process.env.NODE_ENV` from the environment, so it must be set explicitly.
  nodeEnv(value) {
    return `-C jsc.transform.optimizer.globals.envs.NODE_ENV="\'${value}\'"`;
  },

  esm(nodeEnv) {
    return [
      this.shared,
      this.compilerOptions,
      '-C module.type=es6',
      `-C jsc.transform.optimizer.globals.vars.__module="\'ESM\'"`,
      this.nodeEnv(nodeEnv),
    ].join(' ');
  },

  cjs(nodeEnv) {
    return [
      this.shared,
      this.compilerOptions,
      '-C module.type=commonjs',
      `-C jsc.transform.optimizer.globals.vars.__module="\'CJS\'"`,
      this.nodeEnv(nodeEnv),
    ].join(' ');
  },
};

// ----------------------------------------------------------------------------

execSync(`pnpm swc src -d DEV-esm ${swcOptions.esm('development')}`);
console.log('✓ Built esm (DEV).');

execSync(`pnpm swc src -d DEV-cjs ${swcOptions.cjs('development')}`);
console.log('✓ Built cjs (DEV).');

execSync(`pnpm swc src -d esm ${swcOptions.esm('production')}`);
console.log('✓ Built esm.');

execSync(`pnpm swc src -d cjs ${swcOptions.cjs('production')}`);
console.log('✓ Built cjs.');
