const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const HTMLtoJSX = require('htmltojsx');

const htmlPath = 'd:\\clent\\mydwonloads\\Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html';
const htmlStr = fs.readFileSync(htmlPath, 'utf8');

const dom = new JSDOM(htmlStr);
const document = dom.window.document;

const pageDiv = document.querySelector('.page');
if (!pageDiv) {
    console.error('Could not find .page element');
    process.exit(1);
}

// remove script tags
const scripts = pageDiv.querySelectorAll('script');
scripts.forEach(s => s.remove());

const converter = new HTMLtoJSX({
    createClass: false,
    outputClassName: 'ZyroHome'
});

const jsxOutput = converter.convert(pageDiv.outerHTML);

const componentTemplate = `
import React, { useEffect } from 'react';
import './ZyroStyles.css';

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
