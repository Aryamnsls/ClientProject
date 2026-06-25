const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

content = content.replace(/https:\/\/videos\.pexels\.com\/video-files\/6801512\/6801512-uhd_2160_3840_30fps\.mp4/g, 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4');

content = content.replace(/https:\/\/images\.pexels\.com\/videos\/6801512\/[^"&<\s]*/g, 'https://images.pexels.com/videos/3195394/free-video-3195394.jpg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630');

content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1586105251261[^"&<\s]*/g, 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1366&q=70');

fs.writeFileSync('src/pages/Home.jsx', content);
console.log('Replaced all globally');
