const fs = require('fs');
let css = fs.readFileSync('src/components/Navbar.css', 'utf8');
const index = css.indexOf('/* ── SMART TRANSPARENT NAVBAR ── */');
if (index !== -1) {
  css = css.substring(0, index);
}
const newCss = `/* ── SMART TRANSPARENT NAVBAR ── */
.navbar--home:not(.navbar--scrolled) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}
.navbar--home:not(.navbar--scrolled) #zyro-navbar-container .top-blocks {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.navbar--home:not(.navbar--scrolled) [data-element-ref="z2AIKy"] {
  background: #ffffff !important;
  color: #0d141a !important;
  border: none !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
}

/* Logo Card for Home Page */
.navbar--home:not(.navbar--scrolled) #zyro-navbar-container .block-header-logo {
  background: #ffffff !important;
  padding: 12px !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Scrolled state: Glassmorphism white */
.navbar.navbar--scrolled {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}
.navbar.navbar--scrolled #zyro-navbar-container .top-blocks {
  background: transparent !important;
}

/* MOBILE MENU FIXES */
.block-header-layout-mobile__dropdown.mobile-menu-open {
  display: block !important;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
`;
fs.writeFileSync('src/components/Navbar.css', css + newCss);
