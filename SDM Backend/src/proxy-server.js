const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Environment variables with fallback defaults
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const TARGET_URL = process.env.TARGET_URL || 'http://192.168.100.33:1246';

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: TARGET_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
}));

app.listen(PORT, HOST, () => {
  console.log(`Proxy server running at http://${HOST}:${PORT}`);
});
