/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'vite';
import fs from 'fs';
import { resolve } from 'path';
import { minify } from 'html-minifier';

export default defineConfig({
  base: './',
  root: './pages',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: Object.fromEntries(
        getComponentList().map((name) => [
          name,
          resolve(__dirname, `./pages/${name}.html`),
        ]),
      ),
      output: { compact: true },
    },
  },
  plugins: [generateIndex(), addMetaTags(), minifyHtml()],
});

function generateIndex() {
  const addComponentList = (code) =>
    code.replace(
      '%PUT_CONTENT_HERE%',
      `<ul>${getComponentList()
        .filter((component) => component !== 'index')
        .map((component) => {
          return `<li><a class="iui-anchor" href="${component}.html">${component}</a></li>\n`;
        })
        .join('')}</ul>`,
    );

  return {
    name: 'generate-index',
    transform(code, id) {
      if (id.endsWith('index.html')) {
        return { code: addComponentList(code) };
      }
    },
    transformIndexHtml(code) {
      return addComponentList(code);
    },
  };
}

function minifyHtml() {
  return {
    name: 'minify-html',
    transform(code, id) {
      if (id.endsWith('.html')) {
        return {
          code: minify(code, {
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
          }),
          map: null,
        };
      }
    },
  };
}

function addMetaTags() {
  const metaContent = (componentName) => `
    <meta name="description" content="An open-source design system that helps us build a unified web experience.">
    <meta property="og:site_name" content="iTwinUI">
    <meta property="og:title" content="${
      componentName[0].toUpperCase() + componentName.replace(/-/g, ' ').slice(1)
    }">
    <meta property="og:description" content="An open-source design system that helps us build a unified web experience.">
    <meta property="og:image" content="https://itwin.github.io/iTwinUI/css/assets/logo.png">
    <meta property="og:image:alt" content="iTwinUI logo">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta property="og:url" content="https://itwin.github.io/iTwinUI/${componentName}.html">
    <link rel="icon" href="./assets/favicon.svg" type="image/svg+xml" />
    <link rel="alternate icon" href="./assets/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="./assets/pwa-icon.png" />
    <link rel="manifest" href="./assets/manifest.json">
  `;

  return {
    name: 'generate-index',
    transform(code, id) {
      if (!id.endsWith('index.html')) {
        const componentName = id.split('/').pop()?.split('.')[0];
        return {
          code: code.replace('</head>', `${metaContent(componentName)}</head>`),
        };
      }
    },
  };
}

function getComponentList() {
  return fs
    .readdirSync(new URL('./pages', import.meta.url))
    .flatMap((file) => (file.endsWith('.html') ? [file.split('.')[0]] : []));
}
