import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Extend the Window interface to include Buffer
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Make Buffer available globally for gray-matter
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaDescription: string;
  metaKeywords: string;
  content: string;
}

export interface BlogFrontMatter {
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaDescription: string;
  metaKeywords: string;
}

// Function to fetch all blog posts dynamically
export const fetchAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Construct the base URL - handle both development and production
    const baseUrl = import.meta.env.BASE_URL || '/';
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const indexUrl = `${normalizedBaseUrl}blog-data/index.json`;
    
    console.log('🔍 BASE_URL:', import.meta.env.BASE_URL);
    console.log('🔍 Normalized base URL:', normalizedBaseUrl);
    console.log('🔍 Fetching blog index from:', indexUrl);
    console.log('🔍 Current location:', window.location.href);
    
    const indexResponse = await fetch(indexUrl);
    console.log('📋 Index response status:', indexResponse.status, indexResponse.statusText);
    console.log('📋 Index response URL:', indexResponse.url);
    
    if (!indexResponse.ok) {
      console.error('❌ Could not fetch blog index:', {
        status: indexResponse.status,
        statusText: indexResponse.statusText,
        url: indexUrl
      });
      
      // Try alternative URL construction
      const altIndexUrl = '/blog-data/index.json';
      console.log('🔄 Trying alternative URL:', altIndexUrl);
      const altResponse = await fetch(altIndexUrl);
      
      if (!altResponse.ok) {
        console.error('❌ Alternative URL also failed:', altResponse.status, altResponse.statusText);
        return [];
      }
      
      const indexData = await altResponse.json();
      console.log('✅ Index data from alternative URL:', indexData);
      return await processBlogPostsFromJson(indexData.posts || [], '/');
    }
    
    const indexData = await indexResponse.json();
    console.log('✅ Index data loaded successfully:', indexData);
    const blogFiles = indexData.posts || [];
    console.log('📝 Found blog files:', blogFiles.length);
    
    return await processBlogPostsFromJson(blogFiles, normalizedBaseUrl);
    
  } catch (error) {
    console.error('❌ Error fetching blog posts:', error);
    console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

// Helper function to process blog posts from JSON files
const processBlogPostsFromJson = async (blogFiles: any[], baseUrl: string): Promise<BlogPost[]> => {
  const blogPosts: BlogPost[] = [];
  
  // Fetch each blog post JSON file
  for (const blogInfo of blogFiles) {
    try {
      const url = `${baseUrl}blog-data/${blogInfo.slug}.json`;
      console.log(`📄 Fetching blog post: ${blogInfo.slug} from ${url}`);
      
      const response = await fetch(url);
      console.log(`📄 Response status for ${blogInfo.slug}:`, response.status);
      
      if (response.ok) {
        const blogPost = await response.json();
        console.log(`📄 Content loaded for ${blogInfo.slug}:`, blogPost.title);
        
        blogPosts.push(blogPost);
        console.log(`✅ Successfully processed: ${blogInfo.slug}`);
      } else {
        console.error(`❌ Failed to fetch ${blogInfo.slug}:`, response.status, response.statusText);
      }
    } catch (error) {
      console.error(`❌ Error processing blog post ${blogInfo.slug}:`, error);
    }
  }
  
  console.log(`🎉 Total blog posts loaded: ${blogPosts.length}`);
  
  // Sort posts by date (newest first)
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to fetch a single blog post by slug
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Construct the base URL - handle both development and production
    const baseUrl = import.meta.env.BASE_URL || '/';
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    
    console.log('🔍 Fetching single post by slug:', slug);
    console.log('🔍 Using base URL:', normalizedBaseUrl);
    
    // First, fetch the index to find the filename for this slug
    const indexUrl = `${normalizedBaseUrl}blog-data/index.json`;
    let indexResponse = await fetch(indexUrl);
    
    // Try alternative URL if first attempt fails
    if (!indexResponse.ok) {
      console.log('🔄 Index fetch failed, trying alternative URL');
      indexResponse = await fetch('/blog-data/index.json');
    }
    
    if (!indexResponse.ok) {
      console.error('❌ Could not fetch blog index for single post');
      return null;
    }
    
    const indexData = await indexResponse.json();
    const blogFiles = indexData.posts || [];
    
    // Find the blog info for this slug
    const blogInfo = blogFiles.find((blog: any) => blog.slug === slug);
    if (!blogInfo) {
      console.error(`❌ Blog post with slug "${slug}" not found in index`);
      return null;
    }
    
    console.log(`📄 Found blog info for slug "${slug}":`, blogInfo);
    
    // Fetch the specific blog post
    const postUrl = `${normalizedBaseUrl}blog-data/${blogInfo.slug}.json`;
    let response = await fetch(postUrl);
    
    // Try alternative URL if first attempt fails
    if (!response.ok) {
      console.log('🔄 Post fetch failed, trying alternative URL');
      response = await fetch(`/blog-data/${blogInfo.slug}.json`);
    }
    
    if (response.ok) {
      const blogPost = await response.json();
      
      console.log(`✅ Successfully loaded single post: ${slug}`);
      
      return blogPost;
    }
    
    console.error(`❌ Failed to fetch blog post file: ${blogInfo.slug}`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
};

// Function to format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to generate reading time estimate
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTimeMinutes} min read`;
};

// Function to extract excerpt from content if not provided
export const generateExcerpt = (content: string, maxLength: number = 160): string => {
  const plainText = content.replace(/[#*`_~\[\]]/g, '').trim();
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
};

// Function to get related posts based on tags and category
export const getRelatedPosts = async (currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> => {
  const allPosts = await fetchAllBlogPosts();
  
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentPost.slug);
  
  // Score posts based on shared tags and category
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Higher score for same category
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Score for shared tags
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length * 5;
    
    return { post, score };
  });
  
  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
};

// Function to get blog post URL
export const getBlogPostUrl = (slug: string): string => {
  return `/blog/${slug}`;
};

// Function to get blog categories from all posts
export const getBlogCategories = async (): Promise<string[]> => {
  const allPosts = await fetchAllBlogPosts();
  const categories = [...new Set(allPosts.map(post => post.category))];
  return categories.sort();
};

// Function to get all blog tags
export const getBlogTags = async (): Promise<string[]> => {
  const allPosts = await fetchAllBlogPosts();
  const allTags = allPosts.flatMap(post => post.tags);
  const uniqueTags = [...new Set(allTags)];
  return uniqueTags.sort();
}; 