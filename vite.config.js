import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    base: isBuild ? '/react/build/' : '/', // Use '/react/build/' for production, '/' for dev
    build: {
      outDir: isBuild ? 'F:/rohit-react/creo-elements/react/build' : 'dist', // Change the output directory only for production
    },
    plugins: [react()], // Add the React plugin here
    
  };
});
