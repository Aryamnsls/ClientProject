const fs = require('fs');

const htmlPath = 'd:\\clent\\mydwonloads\\Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html';
const htmlStr = fs.readFileSync(htmlPath, 'utf8');

// Use regex to get everything between <div class="page"> and </div> at the end.
// Actually, it's safer to just extract <div class="page">...</div>
const pageMatch = htmlStr.match(/<div class="page">[\s\S]*?<\/div>\s*<\/body>/);
let rawHtml = '';
if (pageMatch) {
    rawHtml = pageMatch[0].replace('</body>', '').trim();
} else {
    // fallback
    rawHtml = htmlStr.split('<body>')[1].split('</body>')[0];
}

// Escape backticks and ${}
rawHtml = rawHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$');

// Remove script tags that might interfere
rawHtml = rawHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');


const componentTemplate = `
import React, { useEffect } from 'react';
import './Home.css';

export default function Home() {
    useEffect(() => {
        // Any scripts needed
    }, []);

    return (
        <div 
            className="home-zyro-wrapper" 
            dangerouslySetInnerHTML={{ __html: \`${rawHtml}\` }} 
        />
    );
}
`;

fs.writeFileSync('d:\\clent\\src\\pages\\Home.jsx', componentTemplate);
console.log('Successfully wrote Home.jsx with dangerouslySetInnerHTML');
