const fs = require('fs');

// Blog tarihlerini bugünden geriye doğru güncelle
const today = new Date();
const blogData = JSON.parse(fs.readFileSync('public/data/blog.json', 'utf8'));

blogData.posts.forEach((post, index) => {
  // Her yazı için 1-2 gün geriye giden tarihler
  const daysAgo = index < 6 ? index + 1 : Math.floor(index / 2) + 1;
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  post.date = date.toISOString().split('T')[0];
});

fs.writeFileSync('public/data/blog.json', JSON.stringify(blogData, null, 2));
console.log('Blog tarihleri güncellendi!');

