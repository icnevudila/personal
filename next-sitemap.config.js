/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourname.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/blog'),
    await config.transform(config, '/blog/nextjs-15-modern-web-applications'),
    await config.transform(config, '/blog/ui-ux-design-user-centered-experiences'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://yourname.com/sitemap.xml',
    ],
  },
}







