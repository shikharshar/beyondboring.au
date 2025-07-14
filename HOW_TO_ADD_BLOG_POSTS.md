# 📝 How to Add New Blog Posts - Simple 2-Step Process

## 🚀 **Super Simple Process**

To add a new blog post, you only need to do **2 things**:

### Step 1: Upload your markdown file
Upload your `.md` file to the `public/blogs/` directory

### Step 2: Update the index
Add one entry to `public/blogs/index.json`

### Step 3: Update the sitemap (Optional but Recommended for SEO)
Add your new blog post to `public/sitemap.xml`

**That's it!** The blog system will automatically pick up your new post.

---

## 📋 **Step-by-Step Instructions**

### 1. Create Your Blog Post

Create a new `.md` file with this frontmatter structure:

```markdown
---
title: "Your Amazing Blog Post Title"
slug: "your-amazing-blog-post-title"
excerpt: "A compelling description that will appear in search results and blog list"
author: "BeyondBoring Team"
date: "2024-01-25"
readTime: "X min read"
category: "Your Category"
tags: ["tag1", "tag2", "tag3"]
featuredImage: "Images/your-image.jpg"
metaDescription: "SEO description (150-160 characters max)"
metaKeywords: "keyword1, keyword2, keyword3"
---

# Your Blog Post Content Here

Write your amazing content using markdown...
```

**Save as**: `your-amazing-blog-post-title.md`

### 2. Upload to GitHub

Upload your file to: `public/blogs/your-amazing-blog-post-title.md`

### 3. Update the Index

Edit `public/blogs/index.json` and add your post to the array:

```json
{
  "posts": [
    {
      "filename": "your-amazing-blog-post-title.md",
      "slug": "your-amazing-blog-post-title",
      "title": "Your Amazing Blog Post Title",
      "category": "Your Category",
      "dateAdded": "2024-01-25"
    },
    // ... existing posts below
  ]
}
```

### 4. Update Sitemap (Optional but Recommended)

Add your blog post URL to `public/sitemap.xml`:

```xml
<!-- Add this in the blog posts section -->
<url>
  <loc>https://shikharshar.github.io/beyondboring.au/blog/your-amazing-blog-post-title</loc>
  <lastmod>2024-01-25T10:00:00+00:00</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <image:image>
    <image:loc>https://shikharshar.github.io/beyondboring.au/Images/your-image.jpg</image:loc>
    <image:title>Your Amazing Blog Post Title</image:title>
    <image:caption>Expert insights on your category</image:caption>
  </image:image>
</url>
```

**That's it! Your new blog post will appear automatically.** ✨

---

## 🤖 **N8N Workflow Integration**

### Option 1: Manual GitHub Upload
1. Create your markdown file
2. Use GitHub API to upload the `.md` file
3. Use GitHub API to update `index.json`

### Option 2: Automated Workflow

Here's a sample N8N workflow structure:

```
1. Trigger (Webhook/Manual)
   ↓
2. Content Processing Node
   - Generate slug from title
   - Format frontmatter
   - Create markdown content
   ↓
3. Upload Blog Post Node (GitHub API)
   - Upload the .md file to public/blogs/
   ↓
4. Update Index Node (GitHub API)
   - Fetch current index.json
   - Add new entry
   - Upload updated index.json
   ↓
5. Update Sitemap Node (GitHub API)
   - Fetch current sitemap.xml
   - Add new blog post URL
   - Upload updated sitemap.xml
   ↓
6. Trigger Build Node (Optional)
   - Trigger GitHub Pages rebuild
```

### Sample N8N GitHub API Calls:

#### Upload Blog Post:
```json
{
  "method": "PUT",
  "url": "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/public/blogs/{{$json.slug}}.md",
  "headers": {
    "Authorization": "Bearer YOUR_GITHUB_TOKEN",
    "Content-Type": "application/json"
  },
  "body": {
    "message": "Add new blog post: {{$json.title}}",
    "content": "{{$base64($json.markdownContent)}}"
  }
}
```

#### Update Index:
```json
{
  "method": "PUT", 
  "url": "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/public/blogs/index.json",
  "headers": {
    "Authorization": "Bearer YOUR_GITHUB_TOKEN",
    "Content-Type": "application/json"
  },
  "body": {
    "message": "Update blog index",
    "content": "{{$base64($json.updatedIndex)}}",
    "sha": "{{$json.currentIndexSha}}"
  }
}
```

#### Update Sitemap:
```json
{
  "method": "PUT",
  "url": "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/public/sitemap.xml",
  "headers": {
    "Authorization": "Bearer YOUR_GITHUB_TOKEN",
    "Content-Type": "application/json"
  },
  "body": {
    "message": "Update sitemap with new blog post",
    "content": "{{$base64($json.updatedSitemap)}}",
    "sha": "{{$json.currentSitemapSha}}"
  }
}
```

---

## 📁 **File Structure**

```
public/blogs/
├── index.json                                    # Blog index (UPDATE THIS)
├── automated-lead-generation-strategies-2024.md # Blog post 1
├── roi-optimization-paid-advertising-guide.md   # Blog post 2
└── your-new-blog-post.md                       # Your new post (ADD THIS)
```

---

## ✅ **Quick Checklist**

Before uploading a new blog post:

- [ ] Markdown file has proper frontmatter
- [ ] Slug is URL-friendly (lowercase, hyphens, no spaces)
- [ ] Featured image exists in `/public/Images/`
- [ ] Category matches existing categories (or create new one)
- [ ] SEO fields are filled out
- [ ] Added entry to `index.json`
- [ ] Updated `sitemap.xml` (recommended for SEO)

---

## 🔧 **Pro Tips**

### Slug Best Practices:
- Use lowercase letters
- Replace spaces with hyphens
- Keep it short but descriptive
- Include main keyword

### Categories:
Current categories: "Lead Generation", "Paid Advertising"
You can add new categories anytime!

### Featured Images:
- Place images in `/public/Images/`
- Use relative path: `"Images/your-image.jpg"`
- Optimal size: 1200x630px for social sharing

### Reading Time:
- Rough guide: 200 words per minute
- Example: 1600 words = "8 min read"

---

## 🎯 **Example New Post**

**File**: `public/blogs/facebook-ads-conversion-tracking-2024.md`

```markdown
---
title: "Master Facebook Ads Conversion Tracking in 2024"
slug: "facebook-ads-conversion-tracking-2024"
excerpt: "Complete guide to setting up Facebook Ads conversion tracking for maximum ROI. Learn iOS 14.5+ strategies and server-side tracking."
author: "BeyondBoring Team"
date: "2024-01-25"
readTime: "10 min read"
category: "Paid Advertising"
tags: ["Facebook Ads", "Conversion Tracking", "iOS 14.5", "Server-side Tracking"]
featuredImage: "Images/facebook-ads-tracking.jpg"
metaDescription: "Master Facebook Ads conversion tracking in 2024. Complete guide to iOS 14.5+ strategies and server-side tracking for maximum ROI."
metaKeywords: "Facebook Ads conversion tracking, iOS 14.5, server-side tracking, Facebook pixel, conversions API"
---

# Master Facebook Ads Conversion Tracking in 2024

Your blog content goes here...
```

**Index Entry**:
```json
{
  "filename": "facebook-ads-conversion-tracking-2024.md",
  "slug": "facebook-ads-conversion-tracking-2024",
  "title": "Master Facebook Ads Conversion Tracking in 2024",
  "category": "Paid Advertising",
  "dateAdded": "2024-01-25"
}
```

---

## 🚀 **Ready to Go!**

Your blog system is now **completely dynamic**. Just upload markdown files and update the simple index - no code changes needed!

Perfect for:
- ✅ N8N automation workflows
- ✅ Manual content uploads
- ✅ Team collaboration
- ✅ Non-technical content creators

**Start creating amazing content!** 🎉 