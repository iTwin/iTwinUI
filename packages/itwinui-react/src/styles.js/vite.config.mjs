import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    cssMinify: false,
    lib: {
      entry: resolve(__dirname, './classes.mjs'),
      fileName: (format) => `${format}/styles.js`,
      formats: ['esm', 'cjs'],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // renaming style.css to styles.css
          if (assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name;
        },
      },
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
