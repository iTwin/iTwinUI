import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssMinify: false,
    lib: {
      entry: resolve(__dirname, './classes.mjs'),
      fileName: 'styles',
      formats: ['es'],
    },
  },
  css: {
    modules: {
      // TODO: use proper hash in v4
      generateScopedName: (name) => {
        return `iui3-${name.replace('iui-', '')}`;
      },
    },
  },
});
