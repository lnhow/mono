import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  server: {
    port: 4203,
  },
  plugins: [pluginVue(), pluginModuleFederation(moduleFederationConfig)],
});
