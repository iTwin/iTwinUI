/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { findHeadings } from '@jsdevtools/rehype-toc/lib/fiind-headings.js';
import { createTOC } from '@jsdevtools/rehype-toc/lib/create-toc.js';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AutoImport from 'astro-auto-import';

const isDev = process.env.NODE_ENV === 'development';

// https://astro.build/config
export default defineConfig({
  site: 'https://itwinui.bentley.com',
  integrations: [
    AutoImport({
      imports: [
        './src/components/PropsTable.astro',
        './src/components/LiveExample.astro',
        './src/components/Placeholder.astro',
        { examples: 'AllExamples' },
      ],
    }),
    react(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    syntaxHighlight: 'prism',
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }], rehypeToc],
  },
  server: { port: 1700 },
  scopedStyleStrategy: 'where',
  vite: {
    ssr: {
      noExternal: [
        '@fontsource/noto-sans',
        '@tippyjs/react',
        '@itwin/itwinui-react',
        !isDev && '@itwin/itwinui-icons-react',
        'examples',
      ].filter(Boolean),
    },
  },
});

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
    if (!headings.length) return tree;
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
    return {
      type: 'root',
      children: [
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
          children: tree?.children,
        },
      ].filter(Boolean),
    };
  };
}
