/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { findHeadings } from '@jsdevtools/rehype-toc/lib/fiind-headings.js';
import { findMainNode } from '@jsdevtools/rehype-toc/lib/find-main-node.js';
import { createTOC } from '@jsdevtools/rehype-toc/lib/create-toc.js';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AutoImport from 'astro-auto-import';
import astroExpressiveCode from 'astro-expressive-code';
import * as lightningCss from 'lightningcss';
import { itwinuiReactAliases } from 'helpers';

// https://astro.build/config
export default defineConfig({
  site: 'https://itwinui.bentley.com',
  integrations: [
    AutoImport({
      imports: [
        './src/components/PropsTable.astro',
        './src/components/LiveExample.astro',
        './src/components/Placeholder.astro',
        './src/components/UnstableApiCard.astro',
        { examples: 'AllExamples' },
      ],
    }),
    react(),
    astroExpressiveCode({
      themes: ['github-dark'],
      cascadeLayer: 'thirdparty.ec',
      minSyntaxHighlightingColorContrast: 4.5,
      emitExternalStylesheet: true,
      styleOverrides: {
        borderColor: 'var(--color-line-2)',
        codeBackground: 'transparent',
        codeFontSize: 'var(--type--1)',
        frames: {
          terminalBackground: 'transparent',
          terminalTitlebarBackground: 'transparent',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeToc],
  },
  server: { port: 1700 },
  scopedStyleStrategy: 'where',
  vite: {
    ssr: {
      noExternal: ['@fontsource/noto-sans', '@tippyjs/react', '@itwin/itwinui-react', 'examples'],
    },
    build: { cssMinify: false, assetsInlineLimit: 500 },
    plugins: [lightningCssVite()],
    resolve: { alias: itwinuiReactAliases },
  },
  devToolbar: {
    enabled: false,
  },
});

/** Opinionated vite plugin that uses lightningcss for transpilation and minification. */
function lightningCssVite() {
  return {
    name: 'lightningcss-vite',
    transform(code: string, filename: string) {
      if (filename.endsWith('.css')) {
        const result = lightningCss.transform({
          filename,
          code: Buffer.from(code),
          targets: {
            chrome: (110 << 16) | (0 << 8), // chrome 110
            firefox: (110 << 16) | (0 << 8), // firefox 110
            safari: (16 << 16) | (6 << 8), // safari 16.6
          },
          minify: true,
          sourceMap: true,
        });
        return {
          code: result.code.toString(),
          map: result.map?.toString(),
        };
      }
    },
  };
}

/**
 * Customized version of rehype-toc to place table-of-contents as a sibling of main content.
 */
function rehypeToc() {
  const tocOptions = {
    nav: true,
    headings: ['h2', 'h3', 'h4'],
    position: 'afterbegin',
    cssClasses: {},
  } as any;

  return (tree, file) => {
    const headings = findHeadings(tree, tocOptions);
    const [main] = findMainNode(tree);
    if (!main?.children || !headings.length) return;

    const toc = createTOC(
      [
        {
          type: 'element',
          tagName: 'h2',
          properties: { id: 'overview' },
          children: [{ type: 'text', value: 'Overview' } as any],
        },
        ...headings,
      ],
      tocOptions,
    );

    const firstParagraphOrHeadingIndex = main.children.findIndex((node) => {
      return (
        (node.type === 'element' && (node.tagName === 'p' || node.tagName === 'h2')) ||
        (node.type === 'mdxJsxFlowElement' && (node.name === 'p' || node.name === 'h2'))
      );
    });

    main.children = [
      // MDX imports
      ...main.children.slice(0, firstParagraphOrHeadingIndex),

      // <aside> element with toc
      {
        type: 'element',
        tagName: 'aside',
        children: [toc],
        properties: { className: 'toc-wrapper', 'aria-label': 'Table of contents' },
      },

      // <main> element for the actual page content
      {
        type: 'element',
        tagName: 'main',
        children: main.children.slice(firstParagraphOrHeadingIndex),
      },
    ];

    return tree;
  };
}
