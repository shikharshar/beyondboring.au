import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Framework from './components/Framework';
import EverythingWeHelpWith from './components/EverythingWeHelpWith';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQ from './components/FAQ';
import WhoWeAre from './components/WhoWeAre';
import BlogList from './components/blog/BlogList';
import BlogPost from './components/blog/BlogPost';

function Home() {
  return (
    <>
      <SEOHead
        title="BeyondBoring | Growth-Obsessed Digital Marketing Agency"
        description="Scale profitably with ads. $100K+ in efficient ad spend. From creative to conversion, our team and in-house tech have you covered."
        keywords="digital marketing, paid advertising, Google Ads, Facebook Ads, growth marketing, ROI optimization"
        canonicalUrl={`${import.meta.env.BASE_URL || '/'}`}
      />
      <Header />
      <Hero />
      <Services />
      <Framework />
      <EverythingWeHelpWith />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  // Use import.meta.env.BASE_URL which is set by Vite based on the 'base' config
  const routerBasename = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');

  return (
    <Router basename={routerBasename}>
      <div className="bg-gray-900 text-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;