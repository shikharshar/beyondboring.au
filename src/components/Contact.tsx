import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Ready to Scale?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Let's discuss how we can help your brand achieve predictable, 
            profitable growth through our data-driven advertising strategies.
          </p>
        </div>
        <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
          <div className="flex flex-col items-center justify-center p-10">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Contact Information</h3>
            <p className="text-gray-300 mb-8 text-center">
              Reach out to us and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-8 w-full">
              <div className="flex items-center gap-6">
                <div className="bg-purple-600/70 p-4 rounded-full">
                  <Mail size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-base text-gray-400 mb-1">Email</p>
                  <a href="mailto:hello@beyondboring.com" className="text-white text-lg font-semibold hover:text-purple-300 transition-colors">
                    hello@beyondboring.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-purple-600/70 p-4 rounded-full">
                  <Phone size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-base text-gray-400 mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-white text-lg font-semibold hover:text-purple-300 transition-colors">
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScNgxr78rBxQcDjf4aNEcKOD4b6Xunl2rUJZAUASP0KrvMINw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
            >
              Fill Out Our Contact Form
              <Send size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;