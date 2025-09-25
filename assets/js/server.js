// Minimal static server for local preview (Node.js - CommonJS style)
// Usage: node assets/js/server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../../');
const port = process.env.PORT || 5173;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  try {
    let pathname = decodeURIComponent(req.url.split('?')[0] || '/');
    if (pathname === '/' || pathname === '') pathname = '/index.html';
    const filePath = path.join(root, pathname);
    if (!filePath.startsWith(root)) {
      res.writeHead(403); return res.end('Forbidden');
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(data);
    });
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Server Error');
  }
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));