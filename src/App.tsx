import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Framework from './components/Framework';
import EverythingWeHelpWith from './components/EverythingWeHelpWith';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQ from './components/FAQ';

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Framework />
        <EverythingWeHelpWith />
        <Testimonials />
        <AboutUs />
        <FAQ />
        <Contact />
      </main>
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;