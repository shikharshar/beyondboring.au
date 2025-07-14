import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';
import SEOHead from '../SEOHead';
import Header from '../Header';
import Footer from '../Footer';
import { BlogPost as BlogPostType, fetchBlogPostBySlug, formatDate, getRelatedPosts, getBlogPostUrl } from './BlogUtils';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await fetchBlogPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          // Fetch related posts
          const related = await getRelatedPosts(fetchedPost, 3);
          setRelatedPosts(related);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } else if (post) {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "BeyondBoring",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shikharshar.github.io/beyondboring.au/Images/BeyondBoringLogo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://shikharshar.github.io/beyondboring.au${getBlogPostUrl(post.slug)}`
    },
    "image": {
      "@type": "ImageObject",
      "url": `https://shikharshar.github.io/beyondboring.au/${import.meta.env.BASE_URL}${post.featuredImage}`,
      "width": 1200,
      "height": 630
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": post.readTime
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | BeyondBoring Blog`}
        description={post.metaDescription}
        keywords={post.metaKeywords}
        canonicalUrl={getBlogPostUrl(post.slug)}
        ogImage={post.featuredImage}
        ogType="article"
        article={{
          publishedTime: new Date(post.date).toISOString(),
          modifiedTime: new Date(post.date).toISOString(),
          author: post.author,
          section: post.category,
          tags: post.tags
        }}
        jsonLd={jsonLd}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-900 text-gray-100">
        {/* Breadcrumb */}
        <nav className="pt-24 pb-8 border-b border-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-gray-300">{post.title}</span>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <article className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <header className="mb-12">
                {/* Category */}
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{post.readTime}</span>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:text-purple-400 transition-colors"
                    title="Share this article"
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Featured Image */}
                <div className="relative rounded-lg overflow-hidden mb-12">
                  <img
                    src={`${import.meta.env.BASE_URL}${post.featuredImage}`}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-invert prose-lg max-w-none mb-16">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-gray-100">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-100">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-200">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-200">{children}</h4>,
                    p: ({ children }) => <p className="mb-6 text-gray-300 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="mb-6 space-y-2">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-6 space-y-2">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-300 leading-relaxed">{children}</li>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-purple-500 pl-6 my-8 italic text-gray-300 bg-gray-800/50 py-4 rounded-r-lg">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm">{children}</code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-800 p-6 rounded-lg overflow-x-auto mb-6 border border-gray-700">
                        {children}
                      </pre>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-purple-400 hover:text-purple-300 underline transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => <strong className="text-gray-100 font-semibold">{children}</strong>,
                    em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Article Footer */}
              <footer className="border-t border-gray-800 pt-8">
                <div className="flex items-center justify-between">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    Back to Blog
                  </Link>
                  
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    <Share2 size={20} />
                    Share Article
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-800/50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                      <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-500">
                        <img
                          src={`${import.meta.env.BASE_URL}${relatedPost.featuredImage}`}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover opacity-80"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {relatedPost.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-2">
                          <Link to={getBlogPostUrl(relatedPost.slug)} className="hover:text-purple-400 transition-colors">
                            {relatedPost.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-300 mb-4 line-clamp-2 text-sm">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <span>{formatDate(relatedPost.date)}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Implement These Strategies?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get expert guidance on applying these proven marketing strategies to your business.
            </p>
            <a
              href="https://calendly.com/shikharsharma/beyond-boring-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Book a Strategy Call
              <ArrowRight size={20} />
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPost; 