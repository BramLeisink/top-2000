import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_URL = 'https://raw.githubusercontent.com/BramLeisink/top2000-data/refs/heads/main/data/songs.json';
const OUTPUT_PATH = path.join(__dirname, '../src/lib/data/external/songs.json');

async function fetchData() {
    console.log('Fetching data...');

    const dir = path.dirname(OUTPUT_PATH);
    fs.mkdirSync(dir, { recursive: true });

    const response = await fetch(DATA_URL);
    const data = await response.json();
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${OUTPUT_PATH}`);
}

fetchData().catch(console.error);