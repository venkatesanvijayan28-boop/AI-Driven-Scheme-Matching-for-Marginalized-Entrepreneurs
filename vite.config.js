import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function googleTtsPlugin() {
  return {
    name: 'google-tts-proxy',
    configureServer(server) {
      server.middlewares.use('/api/ai/tts', async (req, res) => {
        try {
          const urlObj = new URL(req.url, 'http://localhost');
          const text = urlObj.searchParams.get('text');
          const lang = (urlObj.searchParams.get('lang') || 'en').split('-')[0].toLowerCase();
          if (!text) {
            res.statusCode = 400;
            res.end('Missing text parameter');
            return;
          }
          const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
          const response = await fetch(ttsUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });
          if (!response.ok) {
            res.statusCode = response.status;
            res.end('TTS upstream error');
            return;
          }
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          const arrayBuffer = await response.arrayBuffer();
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          res.statusCode = 500;
          res.end(err.message);
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), googleTtsPlugin()],
  server: {
    watch: {
      ignored: ['**/*.mp4', '**/*.webm', '**/*.avi', '**/*.mov', '**/dist/**', '**/.git/**']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
