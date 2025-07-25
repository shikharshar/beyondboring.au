import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  position: string;
  company: string;
  quote: string;
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
      name: "David Chen",
      position: "Marketing Director",
      company: "TechGrowth",
      quote: "BeyondBoring's strategic approach to digital marketing has been instrumental in our growth. Their team's dedication and expertise are truly exceptional."
    },
    {
      name: "Lisa Patel",
      position: "CEO",
      company: "InnovateRetail",
      quote: "Working with BeyondBoring has transformed how we approach digital advertising. Their insights and execution have helped us reach new heights."
    },
    {
      name: "James Wilson",
      position: "Head of Growth",
      company: "StartupScale",
      quote: "The team at BeyondBoring brings both expertise and innovation to the table. They've been crucial in helping us navigate the digital landscape."
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
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-700/50">
            <div className="absolute -top-4 left-12 text-purple-500/20">
              <Quote size={80} />
            </div>
            
            <div className="relative z-10">
              <p className="text-gray-300 text-2xl italic leading-relaxed mb-8">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-400">{testimonials[activeIndex].position}</p>
                <p className="text-purple-400">{testimonials[activeIndex].company}</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-12">
              <button 
                onClick={prevTestimonial}
                className="bg-gray-700/50 hover:bg-gray-600/50 rounded-full p-3 transition-colors duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="bg-gray-700/50 hover:bg-gray-600/50 rounded-full p-3 transition-colors duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {['Meta', 'Google', 'TikTok'].map((platform, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center"
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