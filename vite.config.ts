import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
// import basicSsl from '@vitejs/plugin-basic-ssl'

// config here when building for Looker visualization
const vizFolder = 'my-table';
const vizName = 'MyTable';

export default defineConfig({
  base: './', // ใช้ relative path เพื่อหลีก CSP
  plugins: [
    react(),
    // cssInjectedByJsPlugin(), // to inject CSS via JS
    // basicSsl(),
  ],

  define: {
    'process.env': {}
  },

  // Build configuration for Looker visualization
  build: {
    // Build as a library, not a website
    lib: {
      // Entry point for our Looker visualization
      entry: `src/visualizations/${vizFolder}/looker-viz.jsx`,
      // Format that Looker understands
      formats: ['umd'],
      // Library name (for global variable)
      name: `${vizName}Viz`,
      // Output filename pattern
      fileName: (format) => `${vizFolder}.${format}.js`,
    },
    // Output directory
    outDir: 'dist',
    // Clear dist folder before each build
    emptyOutDir: false,
    // Create manifest file
    manifest: false,
    // Minify the output
    minify: true,
    // Rollup options
    rollupOptions: {
      // External dependencies that Looker provides
      external: ['looker'],
      output: {
        globals: {
          looker: 'looker',
        },
        inlineDynamicImports: true,
      },
    },
  },
});
