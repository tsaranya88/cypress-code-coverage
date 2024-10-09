import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import json from '@rollup/plugin-json';
// import babel from '@rollup/plugin-babel';
import istanbul from 'rollup-plugin-istanbul';

const baseConfig = createSpaConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false
});
 
export default merge(baseConfig, {
  // any <script type="module"> inside will be bundled by rollup
  input: './index.html',
  output: {
    entryFileNames: 'main.js'
  },
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
  plugins: [
    json(),
    istanbul({
      exclude: ['node_modules/**']
    }),
  ]
});