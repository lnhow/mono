import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'remote',
  exposes: {
    './button': './src/components/button',
    './card': './src/components/card',
    './bridges/button': './src/components/bridges/button',
    './bridges/card': './src/components/bridges/card',
    './bridges/card-dummy': './src/components/bridges/card-dummy',
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
  bridge: {
    react: 'v19',
    enableBridgeRouter: false,
  },
});
