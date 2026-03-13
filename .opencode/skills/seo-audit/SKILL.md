---
name: seo-audit
description: SEO optimization, sitemap generation, meta tags, and technical SEO for web applications
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: optimization
---

## What I do
- Generate and optimize sitemap.xml
- Configure robots.txt
- Add meta tags (Open Graph, Twitter Cards)
- Implement JSON-LD schema markup
- Optimize for Core Web Vitals
- Perform SEO audits

## When to use me
Use this when:
- Deploying a new page or section
- Improving search engine rankings
- Adding social media previews
- Setting up analytics
- Optimizing performance

## Key SEO Elements

### Meta Tags
```tsx
// ✅ Essential meta tags
<Helmet>
  <title>Page Title | Site Name</title>
  <meta name="description" content="Description for search engines" />
  <meta property="og:title" content="Title for social" />
  <meta property="og:description" content="Description for social" />
  <meta property="og:image" content="/image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
</Helmet>
```

### JSON-LD Schema
```tsx
// ✅ Person schema for portfolio
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Pedro Úbeda",
  "jobTitle": "Software Developer",
  "url": "https://pedroubedasanchez.es",
  "sameAs": [
    "https://linkedin.com/in/pedroubeda",
    "https://github.com/pedroubeda"
  ]
}
</script>
```

### Sitemap Structure
- Include all public pages
- Set appropriate changefreq
- Prioritize homepage
- Include lastmod dates

### robots.txt
- Allow crawlers
- Disallow admin/private paths
- Specify sitemap location

## Project Context
This portfolio should have:
- sitemap.xml with all routes
- robots.txt configured
- JSON-LD Person schema
- Open Graph tags
- Twitter Card tags
- Performance optimized (Core Web Vitals)
