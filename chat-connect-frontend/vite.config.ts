// This file is used to configure Vite, a build tool for modern web development.
import path from "path"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})