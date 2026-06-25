const fs = require('fs');
let css = fs.readFileSync('src/components/Navbar.css', 'utf8');
css = css.replace(/\.navbar:not\(\.navbar--scrolled\)/g, '.navbar--home:not(.navbar--scrolled)');
fs.writeFileSync('src/components/Navbar.css', css);
