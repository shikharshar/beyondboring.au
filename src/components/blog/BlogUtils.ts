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
  const blogPosts: BlogPost[] = [];
  
  try {
    // First, fetch the index file to get list of all blog posts
    const indexResponse = await fetch(`${import.meta.env.BASE_URL}blogs/index.json`);
    if (!indexResponse.ok) {
      console.error('Could not fetch blog index');
      return [];
    }
    
    const indexData = await indexResponse.json();
    const blogFiles = indexData.posts || [];
    
    // Fetch each blog post
    for (const blogInfo of blogFiles) {
      try {
        const url = `${import.meta.env.BASE_URL}blogs/${blogInfo.filename}`;
        const response = await fetch(url);
        if (response.ok) {
          const markdownContent = await response.text();
          const { data, content } = matter(markdownContent);
          
          const blogPost: BlogPost = {
            slug: data.slug,
            title: data.title,
            excerpt: data.excerpt,
            author: data.author,
            date: data.date,
            readTime: data.readTime,
            category: data.category,
            tags: data.tags || [],
            featuredImage: data.featuredImage,
            metaDescription: data.metaDescription,
            metaKeywords: data.metaKeywords,
            content: content
          };
          
          blogPosts.push(blogPost);
        }
      } catch (error) {
        console.error(`Error fetching blog post ${blogInfo.filename}:`, error);
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
  
  // Sort posts by date (newest first)
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Function to fetch a single blog post by slug
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // First, fetch the index to find the filename for this slug
    const indexResponse = await fetch(`${import.meta.env.BASE_URL}blogs/index.json`);
    if (!indexResponse.ok) {
      console.error('Could not fetch blog index');
      return null;
    }
    
    const indexData = await indexResponse.json();
    const blogFiles = indexData.posts || [];
    
    // Find the blog info for this slug
    const blogInfo = blogFiles.find((blog: any) => blog.slug === slug);
    if (!blogInfo) {
      return null;
    }
    
    // Fetch the specific blog post
    const response = await fetch(`${import.meta.env.BASE_URL}blogs/${blogInfo.filename}`);
    if (response.ok) {
      const markdownContent = await response.text();
      const { data, content } = matter(markdownContent);
      
      return {
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        author: data.author,
        date: data.date,
        readTime: data.readTime,
        category: data.category,
        tags: data.tags || [],
        featuredImage: data.featuredImage,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        content: content
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
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