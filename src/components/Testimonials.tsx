import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
  result: string;
  image: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      position: "CMO",
      company: "Zenly",
      quote: "BeyondBoring transformed our ad strategy. Their AI-driven approach eliminated guesswork and delivered consistent results.",
      result: "Reduced CAC by 32% while scaling monthly ad spend from $50K to $300K",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Michael Rodriguez",
      position: "Growth Lead",
      company: "Public",
      quote: "Working with BeyondBoring has been a game-changer. Their team's expertise and data-driven methodology have completely transformed our advertising approach.",
      result: "Increased conversion rates by 45% and ROAS by 2.7x within 3 months",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Emily Chang",
      position: "Founder",
      company: "DigitalFirst",
      quote: "After struggling with inconsistent ad performance, BeyondBoring brought stability and predictable growth to our campaigns.",
      result: "Scaled monthly revenue from $250K to $1.2M with profitable ad campaigns",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-800 to-transparent"></div>
      
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Client Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't take our word for it. See how we've helped brands like yours achieve
            exceptional results.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gray-800 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-700">
            <div className="absolute -top-5 left-10 text-purple-500">
              <Quote size={40} className="opacity-50" />
            </div>
            
            <div className="md:flex items-center gap-8">
              <div className="mb-6 md:mb-0 md:w-1/3">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500/30">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                  <p className="text-gray-400">{testimonials[activeIndex].position}</p>
                  <p className="text-purple-400 font-medium">{testimonials[activeIndex].company}</p>
                </div>
              </div>
              
              <div className="md:w-2/3">
                <p className="text-gray-300 text-lg italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 font-medium mb-2">RESULTS:</p>
                  <p className="text-white font-semibold">{testimonials[activeIndex].result}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              <button 
                onClick={prevTestimonial}
                className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors duration-200"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'bg-purple-500 w-6' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors duration-200"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {['Meta', 'Google', 'TikTok'].map((platform, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center"
              >
                <div className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  {index === 0 ? '250%' : index === 1 ? '3.5x' : '42%'}
                </div>
                <p className="text-gray-300">
                  {index === 0 ? 'Average ROAS improvement' : index === 1 ? 'Conversion rate increase' : 'Reduction in customer acquisition cost'}
                </p>
                <p className="text-purple-400 text-sm font-medium mt-2">{platform} Campaigns</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;