const fs = require('fs');

const htmlPath = 'd:\\clent\\mydwonloads\\Placynt - Your Trusted Placement Agency for Top Talent _ Placynt.html';
const htmlStr = fs.readFileSync(htmlPath, 'utf8');

// Use regex to get everything between <div class="page"> and </div> at the end.
const pageMatch = htmlStr.match(/<div class="page">([\s\S]*?)<\/div>\s*<\/body>/);
let rawHtml = pageMatch ? pageMatch[1] : '';

// 1. Extract Header
const headerRegex = /<div class="top-blocks--sticky top-blocks">[\s\S]*?<\/header><\/div>/;
let headerHtml = '';
rawHtml = rawHtml.replace(headerRegex, (match) => {
    headerHtml = match;
    return ''; // Remove from rawHtml
});

// Replace hardcoded background-color in header with dynamic variable
headerHtml = headerHtml.replace(/--background-color:rgb\(255, 255, 255\);/, '--background-color:${scrolled ? "rgb(255, 255, 255)" : "transparent"};');

// 2. Extract Footer
// The footer is <section id="zSiG-O" ...>...</section>
const footerRegex = /<section id="zSiG-O"[\s\S]*?<\/section>/;
let footerHtml = '';
rawHtml = rawHtml.replace(footerRegex, (match) => {
    footerHtml = match;
    return ''; // Remove from rawHtml
});

// Escape backticks and $ for template literals
const escapeHtml = (str) => str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

// Fix the headerHtml variables that we want to remain dynamic
// Oh wait, if we use escapeHtml, it will escape our ${scrolled} template part.
// So we escape first, then manually inject the ${scrolled} part.
let headerSafe = escapeHtml(headerHtml);
// Re-enable the dynamic part
headerSafe = headerSafe.replace(/--background-color:\\\$\\{scrolled \? "rgb\(255, 255, 255\)" : "transparent"\\};/, '--background-color:${scrolled ? "rgb(255, 255, 255)" : "transparent"};');

const footerSafe = escapeHtml(footerHtml);

// The remaining rawHtml is just the Home blocks
// BUT there is <div class="sticky-trigger"></div> at the beginning
const homeSafe = escapeHtml(rawHtml);


// Write Navbar.jsx
const navbarCode = `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Intercept clicks on links to use React Router
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin || url.origin === 'https://placynt.com') {
          e.preventDefault();
          let path = url.pathname;
          navigate(path);
          window.scrollTo(0, 0);
        }
      }
    };
    
    // add event listener to the specific navbar container
    const nav = document.getElementById('zyro-navbar-container');
    if (nav) {
        nav.addEventListener('click', handleClick);
        return () => nav.removeEventListener('click', handleClick);
    }
  }, [navigate]);

  return (
    <div 
        id="zyro-navbar-container"
        dangerouslySetInnerHTML={{ __html: \`${headerSafe}\` }} 
    />
  );
}
`;

fs.writeFileSync('d:\\clent\\src\\components\\Navbar.jsx', navbarCode.trim());

// Write Footer.jsx
const footerCode = `
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href) {
        const url = new URL(link.href);
        if (url.origin === window.location.origin || url.origin === 'https://placynt.com') {
          e.preventDefault();
          let path = url.pathname;
          navigate(path);
          window.scrollTo(0, 0);
        }
      }
    };
    
    const footer = document.getElementById('zyro-footer-container');
    if (footer) {
        footer.addEventListener('click', handleClick);
        return () => footer.removeEventListener('click', handleClick);
    }
  }, [navigate]);

  return (
    <div 
        id="zyro-footer-container"
        dangerouslySetInnerHTML={{ __html: \`${footerSafe}\` }} 
    />
  );
}
`;

fs.writeFileSync('d:\\clent\\src\\components\\Footer.jsx', footerCode.trim());

// Write Home.jsx
const homeCode = `
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
      const handleClick = (e) => {
        const link = e.target.closest('a');
        if (link && link.href) {
          const url = new URL(link.href);
          if (url.origin === window.location.origin || url.origin === 'https://placynt.com') {
            e.preventDefault();
            let path = url.pathname;
            navigate(path);
            window.scrollTo(0, 0);
          }
        }
      };
      
      const home = document.getElementById('zyro-home-container');
      if (home) {
          home.addEventListener('click', handleClick);
          return () => home.removeEventListener('click', handleClick);
      }
    }, [navigate]);

    return (
        <div 
            id="zyro-home-container"
            className="home-zyro-wrapper page" 
            dangerouslySetInnerHTML={{ __html: \`${homeSafe}\` }} 
        />
    );
}
`;

fs.writeFileSync('d:\\clent\\src\\pages\\Home.jsx', homeCode.trim());

console.log('Successfully split Zyro HTML into Navbar, Footer, and Home!');
