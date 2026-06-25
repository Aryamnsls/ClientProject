const fs = require('fs');

let homeJsx = fs.readFileSync('src/pages/Home.jsx', 'utf8');

const effectCode = `
  useEffect(() => {
    // Setup animations for the numbers 150+ and 15 once they exist
    const setupCounters = () => {
      const h3s = Array.from(document.querySelectorAll('#zyro-home-container h3'));
      const target150 = h3s.find(el => el.textContent.includes('150+'));
      const target15 = h3s.find(el => el.textContent === '15');

      if (target150 && !target150.classList.contains('home-counter')) {
        target150.classList.add('home-counter');
        target150.dataset.target = '150';
        target150.dataset.suffix = '+';
        target150.textContent = '0+';
      }
      if (target15 && !target15.classList.contains('home-counter')) {
        target15.classList.add('home-counter');
        target15.dataset.target = '15';
        target15.dataset.suffix = '';
        target15.textContent = '0';
      }

      const counters = document.querySelectorAll('.home-counter');
      if (counters.length === 2) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el = entry.target;
              if (el.dataset.animating) return;
              el.dataset.animating = 'true';
              const target = parseInt(el.dataset.target, 10);
              const suffix = el.dataset.suffix;
              let start = 0;
              const duration = 2000;
              const increment = target / (duration / 16);
              const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                  el.textContent = target + suffix;
                  clearInterval(timer);
                  el.dataset.animating = '';
                } else {
                  el.textContent = Math.ceil(start) + suffix;
                }
              }, 16);
            }
          });
        }, { threshold: 0.5 });
        counters.forEach(c => {
          observer.observe(c);
          // also add click to recount
          c.style.cursor = 'pointer';
          c.onclick = () => {
            c.textContent = '0' + c.dataset.suffix;
            c.dataset.animating = '';
            observer.unobserve(c);
            setTimeout(() => observer.observe(c), 50);
          };
        });
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (setupCounters()) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);
`;

if (!homeJsx.includes('setupCounters()')) {
  homeJsx = homeJsx.replace('useEffect(() => {', effectCode + '\n  useEffect(() => {');
  fs.writeFileSync('src/pages/Home.jsx', homeJsx);
}

// Add CSS for padding to Home.css
let homeCss = fs.readFileSync('src/pages/Home.css', 'utf8');
const cssAdd = `
/* Fix navbar covering home hero */
#zyro-home-container .block-layout:first-of-type,
#zyro-home-container > div > astro-island > div > div:first-child {
  padding-top: 140px !important;
}
`;
if (!homeCss.includes('padding-top: 140px')) {
  fs.writeFileSync('src/pages/Home.css', homeCss + cssAdd);
}
