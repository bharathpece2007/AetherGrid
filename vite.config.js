import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    strictPort: true, // Forces it to fail if 9000 is taken, so we guarantee it runs on 9000
    host: true, // Listens on all local IPs to ensure it works across setups
    watch: {
      usePolling: true, // Ensures real-time branch switching and file updates register instantly
    }
  }
})
