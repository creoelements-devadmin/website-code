export const servicesLinks = [
  {
    to: '/services/website-design-development',
    label: 'Website Design and Development',
    slug: 'website-design-development',
    title: 'Website Design and Development'
  },
  {
    to: '/services/ecommerce-website-development',
    label: 'E-commerce Website Development',
    slug: 'ecommerce-website-developmentecommerce-website-development',
    title: 'E-commerce Website Development'
  },
  {
    to: '/services/search-engine-optimisation',
    label: 'Search Engine Optimisation (SEO)',
    slug: 'search-engine-optimisation',
    title: 'Search Engine Optimisation'
  },
  {
    to: '/services/social-media-management',
    label: 'Social Media Management',
    slug: 'social-media-management',
    title: 'Social Media Management'
  },
  {
    to: '/services/branding-brand-identity',
    label: 'Branding and Brand Identity',
    slug: 'branding-brand-identity',
    title: 'Branding and Brand Identity'
  },
  {
    to: '/services/performance-marketing',
    label: 'Performance Marketing',
    slug: 'performance-marketing',
    title: 'Performance Marketing'
  },
  {
    to: '/services/product-photography',
    label: 'Product Photography and Creative Shoots',
    slug: 'product-photography',
    title: 'Product Photography and Creative Shoots'
  },
  {
    to: '/services/graphic-design',
    label: 'Graphic Design',
    slug: 'graphic-design',
    title: 'Graphic Design'
  },
  {
    to: '/services/corporate-gifting',
    label: 'Corporate Gifting and Brand Merchandise',
    slug: 'corporate-gifting',
    title: 'Corporate Gifting and Brand Merchandise'
  },
];



export const primaryLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/work-with-us', label: 'Work With Us' },
  { to: '/clients', label: 'Our Clients' },
  { to: '/blog', label: 'Blogs' },
];

export const mobileLinks = [
  { to: '/', label: 'Home' },
  ...primaryLinks,
];

export const formatNumber = (index) =>
  String(index + 1).padStart(2, '0');