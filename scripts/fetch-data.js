import fs from 'fs';

const DATA_URL = 'https://raw.githubusercontent.com/BramLeisink/top2000-data/refs/heads/main/data/songs.json';
const OUTPUT_PATH = './src/lib/data/external/songs.json';

async function fetchData() {
    console.log('Fetching data...');
    const response = await fetch(DATA_URL);
    const data = await response.json();
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data));
    console.log('Data fetched successfully');
}

fetchData().catch(console.error);