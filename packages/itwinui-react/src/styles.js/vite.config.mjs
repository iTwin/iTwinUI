/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { version } from '../../package.json';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    cssMinify: false,
    lib: {
      entry: path.resolve(__dirname, './classes.mjs'),
      fileName: (format) => `${format}/styles.js`,
      formats: ['esm', 'cjs'],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // renaming style.css to styles.css
          if (assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
  plugins: [
    {
      name: 'copy-files-after-build',
      closeBundle: async () => {
        await copyBuildOutput();
      },
    },
  ],
  css: {
    modules: {
      // TODO: use proper hash in v4
      generateScopedName: (name) => {
        return `_iui${version.replace(/./g, '')}-${name.replace('iui-', '')}`;
      },
    },
    postcss: {
      plugins: [
        Object.assign(
          () => ({
            postcssPlugin: true,
            Rule(rule) {
              if (
                rule.type === 'rule' &&
                rule.selector?.startsWith(':where([data-iui-theme')
              ) {
                rule.selector = `:where(.iui-root)${rule.selector}`;
              }
            },
          }),
          { postcss: true },
        ),
      ],
    },
  },
});

// ----------------------------------------------------------------------------

const root = path.join(__dirname, '..', '..');
const srcDir = path.join(root, 'src');
const distDir = path.join(srcDir, 'styles.js', 'dist');
const distEsmDir = path.join(distDir, 'esm');
const distCjsDir = path.join(distDir, 'cjs');
const outCjsDir = path.join(root, 'cjs');
const outEsmDir = path.join(root, 'esm');

const copyBuildOutput = async () => {
  // create cjs/ and esm/ directories if they don't exist
  if (!fs.existsSync(outCjsDir)) {
    await fs.promises.mkdir(outCjsDir);
  }
  if (!fs.existsSync(outEsmDir)) {
    await fs.promises.mkdir(outEsmDir);
  }

  // copy styles.js from src/styles.js/dist/ into cjs/ and esm/
  await fs.promises.copyFile(
    path.join(distEsmDir, 'styles.js'),
    path.join(outEsmDir, 'styles.js'),
  );
  await fs.promises.copyFile(
    path.join(distCjsDir, 'styles.js'),
    path.join(outCjsDir, 'styles.js'),
  );

  // copy styles.css from src/styles.js/dist/ into <root>/
  await fs.promises.copyFile(
    path.join(distDir, 'styles.css'),
    path.join(root, 'styles.css'),
  );

  // copy styles.d.ts from src/ into cjs/ and esm/
  await fs.promises.copyFile(
    path.join(srcDir, 'styles.d.ts'),
    path.join(outEsmDir, 'styles.d.ts'),
  );
  await fs.promises.copyFile(
    path.join(srcDir, 'styles.d.ts'),
    path.join(outCjsDir, 'styles.d.ts'),
  );
};
