import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert markdown files to JSON
function convertBlogsToJson() {
  const blogsDir = path.join(__dirname, '../public/blogs');
  const outputDir = path.join(__dirname, '../public/blog-data');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Read the index.json to get list of blog files
  const indexPath = path.join(blogsDir, 'index.json');
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  
  console.log('Converting blog posts to JSON format...');
  
  const convertedPosts = [];
  
  // Convert each markdown file to JSON
  indexData.posts.forEach(postInfo => {
    try {
      const markdownPath = path.join(blogsDir, postInfo.filename);
      const markdownContent = fs.readFileSync(markdownPath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content } = matter(markdownContent);
      
      // Create JSON version
      const jsonPost = {
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
      
      // Write individual JSON file
      const jsonPath = path.join(outputDir, `${postInfo.slug}.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(jsonPost, null, 2));
      
      convertedPosts.push({
        slug: postInfo.slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        date: data.date
      });
      
      console.log(`✅ Converted: ${postInfo.filename} → ${postInfo.slug}.json`);
    } catch (error) {
      console.error(`❌ Error converting ${postInfo.filename}:`, error.message);
    }
  });
  
  // Create new index file for JSON posts
  const jsonIndex = {
    posts: convertedPosts
  };
  
  const jsonIndexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(jsonIndexPath, JSON.stringify(jsonIndex, null, 2));
  
  console.log(`✅ Created index: ${jsonIndexPath}`);
  console.log(`🎉 Converted ${convertedPosts.length} blog posts to JSON format`);
}

// Run the conversion
convertBlogsToJson(); 