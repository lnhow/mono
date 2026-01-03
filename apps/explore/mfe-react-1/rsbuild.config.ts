import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin'
import moduleFederationConfig from './module-federation.config'

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  server: {
    port: 4201,
  },
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  html: {
    template: 'src/index.template.html',
  },
})
