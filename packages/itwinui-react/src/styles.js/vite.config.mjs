/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs';
import path from 'node:path';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssMinify: false,
    lib: {
      entry: resolve(__dirname, './classes.mjs'),
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
        return `_iui3-${name.replace('iui-', '')}`;
      },
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
