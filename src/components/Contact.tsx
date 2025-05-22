import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    budget: ''
  });
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thanks for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      budget: ''
    });
  };

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
        
        <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700">
          <div className="md:flex">
            <div className="md:w-2/5 bg-gradient-to-br from-purple-900 to-blue-900 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Mail size={20} className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:hello@beyondboring.com" className="text-white hover:text-purple-300 transition-colors">
                      hello@beyondboring.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Phone size={20} className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+1234567890" className="text-white hover:text-purple-300 transition-colors">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-white font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  {['LinkedIn', 'Twitter', 'Instagram'].map((platform, index) => (
                    <a 
                      key={index}
                      href="#" 
                      className="bg-gray-800/30 hover:bg-purple-500/30 p-2 rounded-full transition-colors duration-300"
                    >
                      {platform[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 p-8 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-400 mb-2">
                      Monthly Ad Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      <option value="10k-25k">$10K - $25K</option>
                      <option value="25k-50k">$25K - $50K</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k+">$100K+</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;