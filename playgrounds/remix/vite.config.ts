import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { itwinuiReactAliases } from 'helpers';

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  server: {
    port: 1704,
  },
  resolve: {
    alias: itwinuiReactAliases,
  },
});
