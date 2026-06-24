const fs = require('fs');

const headerHtml = fs.readFileSync('d:/clent/scratch/header.html', 'utf8');
const footerHtml = fs.readFileSync('d:/clent/scratch/footer.html', 'utf8');
const mainHtml = fs.readFileSync('d:/clent/scratch/main.html', 'utf8');

const escapeHtml = (str) => str.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

let headerSafe = escapeHtml(headerHtml);
// Re-enable the dynamic interpolation for background color
headerSafe = headerSafe.replace(/--background-color:\\\$\\{scrolled \? "rgb\(255, 255, 255\)" : "transparent"\\};/g, '--background-color:${scrolled ? "rgb(255, 255, 255)" : "transparent"};');

// We also need to change the nav link color if requested, but let's just do background first.
// The user said "see the white border only appear when user start scrolling".
// Zyrosite also toggles class maybe? We can just toggle the contrast background color.

const footerSafe = escapeHtml(footerHtml);
const mainSafe = escapeHtml(mainHtml);

const navbarCode = `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll(); // initialize
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            dangerouslySetInnerHTML={{ __html: \`${mainSafe}\` }} 
        />
    );
}
`;

fs.writeFileSync('d:\\clent\\src\\pages\\Home.jsx', homeCode.trim());

console.log('Successfully wrote React components!');
