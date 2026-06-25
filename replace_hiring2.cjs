const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

content = content.replace(/3195394/g, '853889');
content = content.replace(/1497366216548-37526070297c/g, '1556761175-5973dc0f32d7');

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Replaced video with handshake/meeting');
