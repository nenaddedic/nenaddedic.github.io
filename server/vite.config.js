// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { EXTERNAL_DEPS} from './external-deps';

// Get a list of built-in Node modules (like 'fs', 'path', 'http')
// You'll need to install the 'builtin-modules' package
import builtinModules from 'builtin-modules'; 

export default defineConfig({
  build: {
    // 1. Specify the output target as 'node'
    target: 'node20', // or whatever Node.js version you use on GCF
    
    // 2. Specify the entry file for your server function
    lib: {
      entry: resolve(__dirname, 'src/index.ts'), // Point to your main function file
      formats: ['cjs'], // Cloud Functions often prefers CommonJS (cjs)
      fileName: 'index',
    },
    
    // 3. Set output directory
    outDir: 'dist/server', // Where the bundled file will go
    
    rollupOptions: {
      // 4. Externalize built-in Node modules
      // This tells Rollup NOT to bundle 'fs', 'path', etc., 
      // as they are available in the GCF runtime.
      external: [
          ...builtinModules, ...EXTERNAL_DEPS
      ],
    },
    // Optional: Keep the build fast
    minify: false,
    
  },
});