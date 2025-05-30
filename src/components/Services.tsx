import React, { useEffect, useRef } from 'react';
import { BarChart3, BrainCircuit, LineChart, Target } from 'lucide-react';
import ServiceCard from './cards/ServiceCard';

const Services = () => {
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

  const services = [
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-500" />,
      title: "Data Analysis",
      description: "Our team of data analyst experts dissects industry and competitive ads to unearth winning creative strategies, fast.",
      features: ["Data analysis", "Competitive research", "Efficient creative development"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Automated Dashboards",
      description: "We leverage our software expertise to build tailored, real-time dashboards that give you instant, precise insights into your company's performance.",
      features: ["Tailored solutions", "Real-time analytics", "Custom dashboards"]
    },
    {
      icon: <Target className="h-8 w-8 text-pink-500" />,
      title: "Fractional Team Approach",
      description: "The combination of our tools, workflows, and automations helps us be efficient and generate better results at a lower cost vs. hiring an in-house team or trad. agency.",
      features: ["Expert ad specialists", "Cost-effective scaling", "Flexible resource allocation"]
    }
  ];

  return (
    <section 
      id="services" 
      className="pt-10 pb-40 bg-gray-900"
    >
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Stop gambling. Get Beyond Boring
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Here's how we maximize your ad profitability & conversions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;