import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';

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
    port: 3050,
  },
  integrations: [relativeLinks()],
});
