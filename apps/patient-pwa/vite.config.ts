import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"
import babel from '@rolldown/plugin-babel'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "pwa-192x192.svg", "pwa-512x512.svg"],
      devOptions: {
        enabled: true,
      },
      // workbox: {
      //   runtimeCaching: [
      //     {
      //       // Intercepts API requests matching this URL pattern
      //       urlPattern: ({ url }) => url.origin === 'https://example.com',
      //       handler: 'NetworkFirst', // Tries network; falls back to cache if offline
      //       options: {
      //         cacheName: 'api-responses',
      //         expiration: {
      //           maxEntries: 50,
      //           maxAgeSeconds: 60 * 60 * 24, // Cache for 24 hours
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200], // Only cache successful responses
      //         },
      //       },
      //     },
      //   ],
      // },
      manifest: {
        name: "Patient PWA",
        short_name: "Patient PWA",
        description: "Patient PWA",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
          },
          {
            src: "/pwa-512x512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // "@careline/ui": path.resolve(__dirname, "../../packages/ui/src"),
    }
  }
})
