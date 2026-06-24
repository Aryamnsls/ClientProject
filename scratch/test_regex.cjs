const fs = require('fs');
const htmlStr = fs.readFileSync('d:/clent/mydwonloads/Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html', 'utf8');

const pageMatch = htmlStr.match(/<div class="page">([\s\S]*?)<\/body>/);
if(!pageMatch) {
    console.log('No page match');
    process.exit(1);
}

let rawHtml = pageMatch[1];
const headerMatch = rawHtml.match(/<div class="top-blocks--sticky top-blocks">[\s\S]*?<\/header>\s*<\/div>/);
console.log('headerMatch:', headerMatch ? 'FOUND' : 'NOT FOUND');

const footerMatch = rawHtml.match(/<section id="zSiG-O"[\s\S]*?<\/section>/);
console.log('footerMatch:', footerMatch ? 'FOUND' : 'NOT FOUND');
