import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';

const root = resolve('_site');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
http.createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + path + (path.endsWith('/') ? 'index.html' : ''));
    if (!file.startsWith(root + sep)) throw Error();
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': (mime[extname(file)] || 'application/octet-stream') + '; charset=utf-8' });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
}).listen(8787, '127.0.0.1', () => console.log('http://127.0.0.1:8787/ai-work-notes/'));
