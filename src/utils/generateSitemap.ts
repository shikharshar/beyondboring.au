// Utility to generate sitemap.xml dynamically from blog index
export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  image?: {
    loc: string;
    title: string;
    caption: string;
  };
}

export const generateSitemapXML = async (): Promise<string> => {
  const baseUrl = 'https://shikharshar.github.io/beyondboring.au';
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly', 
      priority: 0.9
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastmod: '2024-01-15T10:00:00+00:00',
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/#services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/#framework`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/#testimonials`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/#who-we-are`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/#contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  // Fetch dynamic blog posts
  let blogPages: SitemapEntry[] = [];
  try {
    const indexResponse = await fetch('/blogs/index.json');
    if (indexResponse.ok) {
      const indexData = await indexResponse.json();
      const posts = indexData.posts || [];
      
      for (const post of posts) {
        try {
          // Fetch the markdown to get image info
          const postResponse = await fetch(`/blogs/${post.filename}`);
          if (postResponse.ok) {
            const content = await postResponse.text();
            const imageMatch = content.match(/featuredImage:\s*["']([^"']+)["']/);
            const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
            
            blogPages.push({
              url: `${baseUrl}/blog/${post.slug}`,
              lastmod: post.dateAdded ? `${post.dateAdded}T10:00:00+00:00` : currentDate,
              changefreq: 'monthly',
              priority: 0.8,
              image: imageMatch && titleMatch ? {
                loc: `${baseUrl}/${imageMatch[1]}`,
                title: titleMatch[1],
                caption: `Expert insights on ${post.category.toLowerCase()}`
              } : undefined
            });
          }
        } catch (error) {
          console.error(`Error processing blog post ${post.filename}:`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching blog index for sitemap:', error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...blogPages];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.image ? `
    <image:image>
      <image:loc>${page.image.loc}</image:loc>
      <image:title>${page.image.title}</image:title>
      <image:caption>${page.image.caption}</image:caption>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

// Function to download sitemap (for development/manual generation)
export const downloadSitemap = async () => {
  try {
    const xml = await generateSitemapXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}; 