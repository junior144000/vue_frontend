import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Enable PWA support in development
      },
      manifest: {
        name: 'Celosia',
        short_name: 'Celosia',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#d10000', // Match Celosia branding
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',    // 👈 allow external access (ngrok)
    port: 5173,         // 👈 make sure this port matches
    strictPort: true,   // 👈 force it to fail if port is taken
    cors: true          // 👈 allow mobile browser access
  }
})
