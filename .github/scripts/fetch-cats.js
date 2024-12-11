const https = require('https');
const fs = require('fs');

const API_KEY = process.env.CAT_API_KEY;
const OUTPUT_FILE = '_data/cats.json';

const options = {
  hostname: 'api.thecatapi.com',
  path: '/v1/images/search?size=small&mime_types=gif&limit=5',
  headers: {
    'x-api-key': API_KEY
  }
};

https.get(options, (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    // Create directory if it doesn't exist
    const dir = '_data';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    // Save the cat data
    fs.writeFileSync(OUTPUT_FILE, data);
    console.log('Cat data saved successfully!');
  });

}).on("error", (err) => {
  console.error("Error: " + err.message);
  process.exit(1);
});