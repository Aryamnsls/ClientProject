const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const HTMLtoJSX = require('htmltojsx');

const htmlPath = 'd:\\clent\\mydwonloads\\Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html';
const htmlStr = fs.readFileSync(htmlPath, 'utf8');

const dom = new JSDOM(htmlStr);
const document = dom.window.document;

// We need the <div class="page__blocks"> for the main content, 
// the header is inside <div class="top-blocks--sticky">, 
// and the footer is inside <section id="zSiG-O"> (or similar).
// Let's just grab the whole <div class="page"> or <body> content.
const pageDiv = document.querySelector('.page');
if (!pageDiv) {
    console.error('Could not find .page element');
    process.exit(1);
}

// remove script tags
const scripts = pageDiv.querySelectorAll('script');
scripts.forEach(s => s.remove());

// Remove astro-island scripts and tags if needed, or leave them.
// htmltojsx will convert it
const converter = new HTMLtoJSX({
    createClass: false,
    outputClassName: 'ZyroHome'
});

const jsxOutput = converter.convert(pageDiv.outerHTML);

const componentTemplate = `
import React, { useEffect } from 'react';
import './ZyroStyles.css'; // We will put global zyro css here

export default function Home() {
    useEffect(() => {
        // any scripts that needed to be executed
    }, []);

    return (
        <div className="home-zyro-wrapper">
            ${jsxOutput.replace(/export default ZyroHome;/, '')}
            <ZyroHome />
        </div>
    );
}
`;

fs.writeFileSync('d:\\clent\\src\\pages\\Home.jsx', componentTemplate);
console.log('Successfully converted Zyro HTML to Home.jsx');
