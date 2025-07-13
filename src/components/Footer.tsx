import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, BrainCircuit } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <a href="#" className="flex items-center gap-2">
            <img src="/Images/BeyondBoringLogo.png" alt="BeyondBoring Logo" className="h-10 w-auto" />
          </a>
          
          <button
            onClick={scrollToTop}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="text-gray-300" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-4">Company Overview</h3>
            <p className="text-gray-400 max-w-md">
              We help growth-obsessed brands scale profitably through data-driven 
              advertising strategies. Our proprietary AI tools and experienced team 
              deliver predictable, sustainable results.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Services', 'Process', 'Results', 'Contact'].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              {['LinkedIn', 'Twitter', 'Instagram', 'Facebook'].map((platform, index) => (
                <li key={index}>
                  <a 
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Beyond Boring. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</Link>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;