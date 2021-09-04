const fs = require('fs');
let rawdata = fs.readFileSync('package.json');
let data = JSON.parse(rawdata);
fs.writeFileSync('./src/components/CurrentVersion.svelte', `<span>${data.version}</span>`);
console.log(`Updated data to version ${data.version}`)