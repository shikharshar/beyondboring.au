import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BrainCircuit } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', href: '#services', isInternal: true },
    { name: 'Framework', href: '#framework', isInternal: true },
    { name: 'Results', href: '#testimonials', isInternal: true },
    { name: 'Who We Are', href: '#who-we-are', isInternal: true },
    { name: 'Blog', href: '/blog', isInternal: false },
    { name: 'Contact', href: '#contact', isInternal: true },
  ];

  const handleNavClick = (href: string, isInternal: boolean) => {
    setIsOpen(false);
    
    if (isInternal && location.pathname !== '/') {
      // If we're not on the home page and clicking an internal link, navigate to home first
      window.location.href = `/${href}`;
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/Images/BeyondBoringLogo.png" alt="BeyondBoring Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            item.isInternal ? (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href, item.isInternal)}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            )
          ))}
          <a
            href="https://calendly.com/shikharsharma/beyond-boring-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
          >
            Book a Call
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              item.isInternal ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200 py-2 font-medium"
                  onClick={() => handleNavClick(item.href, item.isInternal)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-200 py-2 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="https://calendly.com/shikharsharma/beyond-boring-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 text-center"
              onClick={() => setIsOpen(false)}
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;