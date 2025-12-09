
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path to point to dist/index.html (one level up from scripts, then into dist)
const distPath = path.resolve(__dirname, '../dist');
const indexHtml = path.join(distPath, 'index.html');
const notFoundHtml = path.join(distPath, '404.html');

console.log('🚧 Preparing 404.html for GitHub Pages SPA support...');

try {
    if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml);
        console.log('✅ Success: Copied index.html to 404.html');
    } else {
        console.warn('⚠️ Warning: dist/index.html not found. Make sure this script runs after "vite build".');
    }
} catch (error) {
    console.error('❌ Error copying file:', error);
    process.exit(1);
}
