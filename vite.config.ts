import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({  
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://shopify-server-ws3z.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, req, res) => {
            console.error('Proxy Error:', {
              error: err.message,
              url: req.url,
              headers: req.headers
            });
            
            if (!res.headersSent) {
              res.writeHead(502, {
                'Content-Type': 'application/json',
              });
              res.end(JSON.stringify({
                error: 'Bad Gateway',
                message: 'Server connection failed. Please try again later.',
                details: err.message
              }));
            }
          });
          
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Set required headers for the backend CORS policy
            proxyReq.setHeader('X-Forwarded-Proto', 'https');
            proxyReq.setHeader('Origin', 'http://localhost:8080');
            proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
            proxyReq.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            proxyReq.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
            proxyReq.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
            
            if (req.method === 'POST') {
              proxyReq.setHeader('Content-Type', 'application/json');
            }
            
            console.log('Outgoing Request:', {
              method: req.method,
              url: req.url,
              headers: proxyReq.getHeaders()
            });
          });
          
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            const statusCode = proxyRes.statusCode || 500;
            console.log('Incoming Response:', {
              status: statusCode,
              url: req.url,
              method: req.method,
              headers: proxyRes.headers
            });
            
            if (statusCode === 502) {
              console.error('Bad Gateway Response Headers:', proxyRes.headers);
            }
          });
        }
      }
    }
  },
  plugins: [
    react(),
    // Example: a simple plugin for demonstration
    {
      name: 'example-plugin',
      configureServer(server) {
        console.log('Example plugin loaded');
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

