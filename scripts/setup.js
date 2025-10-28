#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Personal Portfolio...\n');

// Create .env.local from example
if (!fs.existsSync('.env.local')) {
  if (fs.existsSync('env.example')) {
    fs.copyFileSync('env.example', '.env.local');
    console.log('✅ Created .env.local from example');
  } else {
    console.log('⚠️  env.example not found, please create .env.local manually');
  }
} else {
  console.log('✅ .env.local already exists');
}

// Create content directory for blog posts
const contentDir = path.join(process.cwd(), 'content', 'blog');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log('✅ Created content/blog directory');
} else {
  console.log('✅ content/blog directory already exists');
}

// Create public directory for assets
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('✅ Created public directory');
} else {
  console.log('✅ public directory already exists');
}

console.log('\n🎉 Setup complete! Next steps:');
console.log('1. Update your personal information in the components');
console.log('2. Add your project images to the public directory');
console.log('3. Customize the design in tailwind.config.ts');
console.log('4. Run "npm run dev" to start development server');
console.log('\nHappy coding! 🎨');













