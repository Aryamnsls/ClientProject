const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const htmlStr = fs.readFileSync('d:/clent/mydwonloads/Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html', 'utf8');

const dom = new JSDOM(htmlStr);
const document = dom.window.document;

const body = document.body;

const header = document.querySelector('.top-blocks--sticky');
console.log('header found:', !!header);

const footer = document.querySelector('section#zSiG-O'); // or whatever footer selector is
console.log('footer found:', !!footer);

let footerEl = footer || Array.from(document.querySelectorAll('section')).pop();
console.log('footer fallback found:', !!footerEl);

// Print the outerHTML lengths to verify
console.log('body size:', body.innerHTML.length);
if(header) console.log('header size:', header.outerHTML.length);
if(footerEl) console.log('footer size:', footerEl.outerHTML.length);

// Now we can actually use jsdom to manipulate the DOM!
if(header) {
    // Change style background color
    let style = header.querySelector('header').getAttribute('style');
    if(style) {
        style = style.replace(/--background-color:\s*rgb\(\s*255\s*,\s*255\s*,\s*255\s*\);/, '--background-color:${scrolled ? "rgb(255, 255, 255)" : "transparent"};');
        header.querySelector('header').setAttribute('style', style);
    }
    
    // remove from body
    header.remove();
}

if(footerEl) {
    footerEl.remove();
}

// remove scripts
body.querySelectorAll('script').forEach(s => s.remove());

fs.writeFileSync('d:/clent/scratch/header.html', header ? header.outerHTML : '');
fs.writeFileSync('d:/clent/scratch/footer.html', footerEl ? footerEl.outerHTML : '');
fs.writeFileSync('d:/clent/scratch/main.html', body.innerHTML);

console.log('Extraction complete via JSDOM!');
