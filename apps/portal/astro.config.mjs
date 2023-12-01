import { defineConfig } from 'astro/config';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: ['last 2 versions', '>0.5%', 'not dead'],
          }),
        ],
      },
    },
  },
  server: { open: true, port: 3000 },
});
