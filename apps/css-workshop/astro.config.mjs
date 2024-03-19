import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'never',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  scopedStyleStrategy: 'where',
  server: {
    port: 3050,
  },
});
