import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'never',
    format: 'file',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
  scopedStyleStrategy: 'where',
  server: {
    host: true,
    port: 3050,
  },
});
