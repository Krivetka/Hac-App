import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api/autocomplete': {
        target: 'https://ttss.krakow.pl/internetservice/services/lookup/autocomplete',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/autocomplete/, ''),
        secure: false
      },
      '/api/tripPassages': {
        target: 'https://ttss.krakow.pl/internetservice/services/tripInfo/tripPassages',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tripPassages/, ''),
        secure: false
      },
      '/api/vehicles': {
        target: 'https://ttss.krakow.pl/internetservice/geoserviceDispatcher/services/vehicleinfo/vehicles',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/vehicles/, ''),
        secure: false
      },
      '/api/stopInfo': {
        target: 'https://ttss.krakow.pl/internetservice/services/stopInfo/stop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stopInfo/, ''),
        secure: false
      },
      '/api/stops': {
        target: 'https://ttss.krakow.pl/internetservice/geoserviceDispatcher/services/stopinfo',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/stops/, '/stop'),
        secure: false
      },
      '/api': {
        target: 'https://ttss.krakow.pl/internetservice/services/lookup',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  }
})

