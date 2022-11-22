import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';
import { resolve } from 'path';
import { minify } from 'html-minifier';
import * as lightningCss from 'lightningcss';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        getComponentList().map((name) => [name, resolve(__dirname, `./backstop/tests/${name}.html`)])
      ),
      output: {
        dir: './backstop/minified',
        compact: true,
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  plugins: [lightningCssPlugin(), generateIndex(), addMetaTags(), minifyHtml()],
  server: {
    open: true,
  },
});

function generateIndex(): Plugin {
  const addComponentList = (code: string) =>
    code.replace(
      '%PUT_CONTENT_HERE%',
      `<ul>${getComponentList()
        .map((component) => {
          return `<li><a class="iui-anchor" href="${component}.html">${component}</a></li>\n`;
        })
        .join('')}</ul>`
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

function minifyHtml(): Plugin {
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

function addMetaTags(): Plugin {
  const metaContent = (componentName) => `
    <meta name="description" content="An open-source design system that helps us build a unified web experience.">
    <meta property="og:site_name" content="iTwinUI">
    <meta property="og:title" content="${componentName[0].toUpperCase() + componentName.replace(/-/g, ' ').slice(1)}">
    <meta property="og:description" content="An open-source design system that helps us build a unified web experience.">
    <meta property="og:image" content="https://itwin.github.io/iTwinUI/backstop/assets/logo.png">
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
        return { code: code.replace('</head>', `${metaContent(componentName)}</head>`) };
      }
    },
  };
}

function getComponentList() {
  return fs
    .readdirSync(new URL('./backstop/tests', import.meta.url))
    .flatMap((file) => (file.endsWith('.html') ? [file.split('.')[0]] : []));
}

function lightningCssPlugin(): Plugin {
  const queryWhitelist = ['direct'];
  const matcherRegex = new RegExp(
    `\\.css\\??(?:${queryWhitelist.join('|')})?$`,
    'i'
  );
  return {
    name: 'lightning-css',
    transform(css, id) {
      if (!matcherRegex.test(id)) {
        return;
      }

      try {
        const { code } = lightningCss.transform({
          minify: true,
          sourceMap: false,
          code: Buffer.from(css),
          filename: id,
          targets: require('./scripts/lightningCssSettings').targets
        });
        return code.toString('utf8');
      } catch {
        return css;
      }
    },
  };
}
