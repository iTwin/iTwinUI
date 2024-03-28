import { defineConfig } from 'vite';

export default defineConfig({
  server: { open: false },
  build: {
    cssMinify: false,
  },
});
