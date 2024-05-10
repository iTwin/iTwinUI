import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { itwinuiReactAliases } from 'helpers';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: {
    port: 1703,
  },
  vite: {
    resolve: {
      alias: itwinuiReactAliases,
    },
  },
});
