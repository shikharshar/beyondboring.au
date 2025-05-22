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
      title: "AI Workflows",
      description: "Leverage our proprietary AI tools to analyze industry and competitive ads to identify winning creative strategies.",
      features: ["Competitive analysis", "Pattern recognition", "Efficient creative development"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Automated Dashboards",
      description: "Streamlined data collection and campaign optimization. Get clear insights into your ad performance at a glance.",
      features: ["Real-time analytics", "Custom KPI tracking", "Actionable insights"]
    },
    {
      icon: <Target className="h-8 w-8 text-pink-500" />,
      title: "Fractional Team Approach",
      description: "Get full-time results at a lower cost than traditional agencies or in-house teams. Maximize your ROI.",
      features: ["Expert ad specialists", "Cost-effective scaling", "Flexible resource allocation"]
    },
    {
      icon: <LineChart className="h-8 w-8 text-green-500" />,
      title: "Transparent Pricing",
      description: "No percentage of ad spend. Simple flat fees based on the value we provide. Know exactly what you're paying for.",
      features: ["Clear fee structure", "No hidden costs", "Predictable budgeting"]
    }
  ];

  const platforms = [
    "Meta Ads", "Google Ads", "TikTok Ads", "Ad Creative", 
    "Copywriting", "Landing Pages", "Funnel Optimization", 
    "Performance Analytics", "Automated Reporting"
  ];

  return (
    <section 
      id="services" 
      className="py-20 bg-gray-900"
    >
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We maximize ad profitability and conversions using our proprietary
            tools and expert strategies. No more guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-6 text-center">Platforms & Specialties</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm font-medium border border-gray-700 hover:border-purple-500 transition-colors duration-300"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;