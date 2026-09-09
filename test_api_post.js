const http = require('http');

const body = JSON.stringify({
  channels: [
    { id: "x", enabled: true },
    { id: "facebook", enabled: false }
  ]
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/social-settings',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
});

req.on('error', console.error);
req.write(body);
req.end();
