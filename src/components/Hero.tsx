/** @jsxImportSource react */
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-900 relative" id="hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              We Help Growth-Obsessed Brands
            </span>{" "}
            <span className="text-white">
              Scale Profitably with Ads
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12">
            $10 million+ in efficient ad spend. From creative to conversion, 
            our team and in-house tech have you covered.
          </p>
          
          <div>
            <a 
              href="https://calendly.com/shikharsharma/beyond-boring-discovery-call" 
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xl font-medium py-5 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;