import createMDX from '@next/mdx'

const withMDX = createMDX({ 
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: { 
    mdxRs: true 
  },
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
}

export default withMDX(nextConfig)

