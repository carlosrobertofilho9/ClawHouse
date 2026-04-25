#!/usr/bin/env node
/**
 * Mini HTTP server para o ClawHouse consumir atividades
 * Serve o activity_stream.jsonl via polling simples
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.CLAWHOUSE_PORT || 18790;
const LOG_FILE = path.join(__dirname, 'activity_stream.jsonl');

const server = http.createServer((req, res) => {
  // CORS para o ClawHouse (React app)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Endpoint: /activity → retorna todos os eventos
  if (req.url === '/activity' || req.url.startsWith('/activity')) {
    try {
      if (!fs.existsSync(LOG_FILE)) {
        res.writeHead(200);
        res.end(JSON.stringify([]));
        return;
      }
      
      const lines = fs.readFileSync(LOG_FILE, 'utf8').trim().split('\n').filter(Boolean);
      const events = lines.map(l => JSON.parse(l));
      
      // Suporte a ?since=TIMESTAMP
      const url = new URL(req.url, `http://localhost:${PORT}`);
      const since = url.searchParams.get('since');
      
      if (since) {
        const sinceDate = new Date(since);
        const filtered = events.filter(e => new Date(e.timestamp) > sinceDate);
        res.writeHead(200);
        res.end(JSON.stringify(filtered));
        return;
      }
      
      // Suporte a ?limit=N
      const limit = parseInt(url.searchParams.get('limit')) || 100;
      
      res.writeHead(200);
      res.end(JSON.stringify(events.slice(-limit)));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  
  // Endpoint: /status → status simples
  if (req.url === '/status') {
    const stats = {
      running: true,
      logExists: fs.existsSync(LOG_FILE),
      lastModified: fs.existsSync(LOG_FILE) ? fs.statSync(LOG_FILE).mtime : null,
    };
    res.writeHead(200);
    res.end(JSON.stringify(stats));
    return;
  }
  
  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found. Use /activity or /status' }));
});

server.listen(PORT, () => {
  console.log(`🐾 ClawHouse Activity Server rodando em http://localhost:${PORT}`);
  console.log(`   - GET /activity       → todos os eventos`);
  console.log(`   - GET /activity?since=ISO_TIMESTAMP → eventos desde`);
  console.log(`   - GET /activity?limit=N → últimos N eventos`);
  console.log(`   - GET /status         → status do servidor`);
});

module.exports = { server };
