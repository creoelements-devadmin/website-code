import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    // Base path for production and dev
    base: isBuild ? '/react/build/' : '/',

    build: {
      // Output folder inside project root
      outDir: 'react/build', // build goes inside react/build
      emptyOutDir: true, // clears react/build before each build
    },

    plugins: [react(), tailwindcss(),],
  };
});
