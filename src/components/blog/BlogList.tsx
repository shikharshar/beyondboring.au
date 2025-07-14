import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import SEOHead from '../SEOHead';
import Header from '../Header';
import Footer from '../Footer';
import { BlogPost, fetchAllBlogPosts, formatDate, getBlogPostUrl } from './BlogUtils';

const BlogList: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchAllBlogPosts();
        setBlogPosts(posts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(posts.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "BeyondBoring Blog",
    "description": "Expert insights on digital marketing, automation, and business growth strategies",
    "url": "https://shikharshar.github.io/beyondboring.au/blog",
    "publisher": {
      "@type": "Organization",
      "name": "BeyondBoring",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shikharshar.github.io/beyondboring.au/Images/BeyondBoringLogo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "url": `https://shikharshar.github.io/beyondboring.au${getBlogPostUrl(post.slug)}`,
      "image": {
        "@type": "ImageObject",
        "url": `https://shikharshar.github.io/beyondboring.au/${import.meta.env.BASE_URL}${post.featuredImage}`
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Expert Digital Marketing Blog | BeyondBoring - Growth Strategies & Insights"
        description="Discover proven digital marketing strategies, automation techniques, and business growth insights. Expert tips on Google Ads, Facebook advertising, lead generation, and ROI optimization."
        keywords="digital marketing blog, marketing strategies, Google Ads tips, Facebook advertising, lead generation, marketing automation, business growth, ROI optimization, PPC management"
        canonicalUrl="/blog"
        jsonLd={jsonLd}
      />
      
      <Header />
      
      <main className="min-h-screen bg-gray-900 text-gray-100">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-purple-900/50 via-gray-900 to-blue-900/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Marketing Insights & Strategies
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Expert insights on digital marketing, automation, and proven strategies to scale your business profitably
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-purple-400">
                  <Clock size={20} />
                  <span>Weekly Updates</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <User size={20} />
                  <span>Expert Authors</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <Tag size={20} />
                  <span>Actionable Insights</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        {categories.length > 0 && (
          <section className="py-8 border-b border-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  All Posts
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-400 mb-4">No blog posts found</h2>
                <p className="text-gray-500">Check back soon for new content!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article key={post.slug} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                    {/* Featured Image */}
                    <div className="relative h-48 bg-gradient-to-br from-purple-600 to-blue-500">
                      <img
                        src={`${import.meta.env.BASE_URL}${post.featuredImage}`}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-80"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <header className="mb-4">
                        <h2 className="text-xl font-bold text-gray-100 mb-2 line-clamp-2 hover:text-purple-400 transition-colors">
                          <Link to={getBlogPostUrl(post.slug)}>
                            {post.title}
                          </Link>
                        </h2>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </header>

                      <p className="text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-gray-400 text-xs">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Read More Link */}
                      <Link
                        to={getBlogPostUrl(post.slug)}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors group"
                      >
                        Read More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Apply These Strategies?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get personalized guidance on implementing these proven marketing strategies for your business.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Book a Strategy Call
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogList; 