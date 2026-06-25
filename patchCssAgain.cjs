const fs = require('fs');
let css = fs.readFileSync('src/components/Navbar.css', 'utf8');

// Remove the white text override
css = css.replace(/\.navbar--home:not\(\.navbar--scrolled\) #zyro-navbar-container \.grid-text-box p,[\s\S]*?color: #ffffff !important;\n\}/, '');

// Remove the hamburger override
css = css.replace(/\.navbar--home:not\(\.navbar--scrolled\) #zyro-navbar-container svg \{[\s\S]*?fill: #ffffff !important;\n\}/, '');

// Change search button to white bg with dark text
css = css.replace(/\.navbar--home:not\(\.navbar--scrolled\) \[data-element-ref="z2AIKy"\] \{[\s\S]*?\}/, `
.navbar--home:not(.navbar--scrolled) [data-element-ref="z2AIKy"] {
  background: #ffffff !important;
  color: #0d141a !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
}`);

// Remove logo invert
css = css.replace(/\.navbar--home:not\(\.navbar--scrolled\) #zyro-navbar-container img\[alt\*="knight"\] \{[\s\S]*?\}/, '');

// Add white card to logo
const logoCardCss = `
/* Logo Card for Home Page */
.navbar--home #zyro-navbar-container .block-header-logo {
  background: #ffffff !important;
  padding: 12px !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar--home #zyro-navbar-container img[alt*="Knight"] {
  filter: none !important;
}
`;
if (!css.includes('/* Logo Card for Home Page */')) {
  css += logoCardCss;
}

fs.writeFileSync('src/components/Navbar.css', css);
