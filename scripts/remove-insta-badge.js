const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const beforeCount = (html.match(/social-avatar-insta-icon/g) || []).length;
console.log('Before count in index.html:', beforeCount);

// Remove the line with social-avatar-insta-icon
html = html.replace(/\r?\n\s*<span class="social-avatar-insta-icon"[^>]*>[\s\S]*?<\/span>/g, '');

const afterCount = (html.match(/social-avatar-insta-icon/g) || []).length;
console.log('After count in index.html:', afterCount);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');
