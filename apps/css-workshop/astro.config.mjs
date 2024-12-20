import { defineConfig } from 'astro/config';
import relativeLinks from 'astro-relative-links';
import react from '@astrojs/react';

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
  integrations: [relativeLinks(), react()],
});
