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
      formats: ['es', 'cjs'],
    },
  },
  css: {
    modules: {
      // TODO: use proper hash in v4
      generateScopedName: (name, filename, css) => {
        return `iui3-${name.replace('iui-', '')}`;
      },
    },
  },
});
