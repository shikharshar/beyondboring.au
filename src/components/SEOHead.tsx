import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  jsonLd?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "BeyondBoring | Scale Profitably with Ads - Digital Marketing Agency",
  description = "Scale your business profitably with data-driven digital marketing strategies. Specializing in Google Ads, Facebook Ads, automation, and conversion optimization. Get results that matter.",
  keywords = "digital marketing agency, Google Ads management, Facebook Ads, paid advertising, marketing automation, conversion optimization, lead generation, ROI optimization, PPC management, social media advertising",
  canonicalUrl,
  ogImage = `${import.meta.env.BASE_URL}Images/BeyondBoringLogo.png`,
  ogType = "website",
  article,
  jsonLd
}) => {
  const baseUrl = "https://shikharshar.github.io/beyondboring.au";
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;

  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BeyondBoring",
    "url": baseUrl,
         "logo": `${baseUrl}${import.meta.env.BASE_URL}Images/BeyondBoringLogo.png`,
    "description": "Digital marketing agency specializing in profitable ad campaigns and marketing automation",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-XXX-XXX-XXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/beyondboring",
      "https://www.facebook.com/beyondboring",
      "https://twitter.com/beyondboring"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Australia",
      "addressCountry": "AU"
    },
    "serviceArea": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Google Ads Management",
            "description": "Professional Google Ads campaign management and optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Facebook Ads Management",
            "description": "Expert Facebook and Instagram advertising campaigns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Marketing Automation",
            "description": "Automated lead generation and nurturing systems"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="BeyondBoring" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="BeyondBoring" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@beyondboring" />
      <meta name="twitter:site" content="@beyondboring" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#8B5CF6" />
      <meta name="msapplication-TileColor" content="#8B5CF6" />
      <meta name="application-name" content="BeyondBoring" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://calendly.com" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd || defaultJsonLd)}
      </script>
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//calendly.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/Images/BeyondBoringLogo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/Images/BeyondBoringLogo.png" />
      <link rel="apple-touch-icon" href="/Images/BeyondBoringLogo.png" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="AU" />
      <meta name="geo.placename" content="Australia" />
    </Helmet>
  );
};

export default SEOHead; 