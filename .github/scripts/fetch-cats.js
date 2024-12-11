const https = require('https');
const fs = require('fs');

const API_KEY = process.env.CAT_API_KEY;
console.log('API Key exists:', !!API_KEY);

const OUTPUT_FILE = '_data/cats.json';

const options = {
  hostname: 'api.thecatapi.com',
  path: '/v1/images/search?size=small&mime_types=gif&limit=5',
  headers: {
    'x-api-key': API_KEY
  }
};

console.log('Making request to:', `https://${options.hostname}${options.path}`);

https.get(options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    console.log('Response received:', data.substring(0, 100) + '...');
    
    // Create directory if it doesn't exist
    const dir = '_data';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log('Created _data directory');
    }
    
    // Save the cat data
    fs.writeFileSync(OUTPUT_FILE, data);
    console.log('Cat data saved to:', OUTPUT_FILE);
    console.log('File contents:', fs.readFileSync(OUTPUT_FILE, 'utf8').substring(0, 100) + '...');
  });

}).on("error", (err) => {
  console.error("Error making request:", err.message);
  process.exit(1);
});