import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'remote',
  exposes: {
    './button': './src/components/button',
    './card': './src/components/card',
  },
  filename: 'remoteEntry.js',
  shared: {
    // ...dependencies,
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    },
  },
});
