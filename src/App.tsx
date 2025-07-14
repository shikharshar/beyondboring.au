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
        title="BeyondBoring | Scale Profitably with Ads - Digital Marketing Agency"
        description="Scale your business profitably with data-driven digital marketing strategies. Specializing in Google Ads, Facebook Ads, automation, and conversion optimization. Get results that matter."
        keywords="digital marketing agency, Google Ads management, Facebook Ads, paid advertising, marketing automation, conversion optimization, lead generation, ROI optimization, PPC management, social media advertising"
        canonicalUrl="/"
      />
      <Header />
      <main>
        <Hero />
        <Services />
        <Framework />
        <EverythingWeHelpWith />
        <Testimonials />
        <WhoWeAre />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | BeyondBoring - Digital Marketing Agency"
        description="Read BeyondBoring's privacy policy to understand how we collect, use, and protect your personal information. Your privacy and data security are our priorities."
        keywords="privacy policy, data protection, personal information, digital marketing privacy, GDPR compliance"
        canonicalUrl="/privacy-policy"
      />
      <PrivacyPolicy />
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
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;