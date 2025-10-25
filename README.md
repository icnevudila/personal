# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🚀 **Next.js 15** with App Router
- 🎨 **Tailwind CSS** with custom design system
- ⚡ **Framer Motion** for smooth animations
- 📱 **Fully Responsive** design
- ♿ **Accessibility** focused
- 🔍 **SEO Optimized** with metadata and sitemap
- 📝 **MDX Support** for blog posts
- 🎯 **TypeScript** for type safety
- 🎨 **Custom Theme** with gradient accents

## Sections

- **Hero** - Eye-catching introduction with call-to-action
- **About** - Personal story and statistics
- **Education** - Academic background and certifications
- **Skills** - Technical skills with progress indicators
- **Projects** - Portfolio showcase with featured projects
- **Blog** - MDX-powered blog with article listings
- **Contact** - Contact form with validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd personal-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Copy environment variables:
```bash
cp env.example .env.local
```

4. Update the environment variables with your information:
```env
SITE_URL=https://yourname.com
NEXT_PUBLIC_SITE_URL=https://yourname.com
CONTACT_EMAIL=hello@yourname.com
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Building for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Customization

### Personal Information

Update the following files with your information:

1. **`app/layout.tsx`** - Update metadata and site information
2. **`components/Hero.tsx`** - Update name and title
3. **`components/About.tsx`** - Update personal description
4. **`components/Education.tsx`** - Update education history
5. **`components/Skills.tsx`** - Update skills and technologies
6. **`components/Projects.tsx`** - Update project portfolio
7. **`components/Contact.tsx`** - Update contact information

### Styling

The design system is built with Tailwind CSS and custom CSS variables:

- **Colors**: Defined in `tailwind.config.ts`
- **Typography**: Custom font families and sizes
- **Animations**: Framer Motion with accessibility support
- **Components**: Reusable component classes in `app/globals.css`

### Blog Posts

Blog posts are created as MDX files in the `content/blog/` directory. Each post should include:

```mdx
---
title: "Your Blog Post Title"
excerpt: "A brief description of your post"
date: "2024-01-01"
category: "Development"
---

# Your Blog Post Content

Write your blog post content here using Markdown.
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance

The website is optimized for performance with:

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Static Generation** - Pre-rendered pages where possible
- **Bundle Analysis** - Optimized JavaScript bundles

## Accessibility

Built with accessibility in mind:

- **Semantic HTML** - Proper heading structure and landmarks
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and descriptions
- **Reduced Motion** - Respects user motion preferences
- **Color Contrast** - WCAG AA compliant color schemes

## SEO

SEO optimized with:

- **Meta Tags** - Comprehensive meta tag setup
- **Open Graph** - Social media sharing optimization
- **Sitemap** - Automatic sitemap generation
- **Robots.txt** - Search engine crawling instructions
- **Structured Data** - JSON-LD structured data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.


