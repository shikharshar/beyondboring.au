import React, { useEffect, useRef } from 'react';
import { LineChart, Rocket, Zap, Target } from 'lucide-react';

const Framework = () => {
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

  const steps = [
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Sprint",
      description: "Campaign data analysis and performance assessment. We identify what's working and what's not.",
      color: "from-blue-600 to-blue-400"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Optimize",
      description: "Focus on enhancing campaign performance. We fine-tune every element for maximum efficiency.",
      color: "from-purple-600 to-purple-400"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Launch",
      description: "Implement new strategies and campaigns. We put our data-driven insights into action.",
      color: "from-pink-600 to-pink-400"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Scale",
      description: "Aim for sustained growth and maximized ROI. We expand what works to increase your profits.",
      color: "from-green-600 to-green-400"
    }
  ];

  return (
    <section id="framework" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-10 transition-all duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Our 4-Step Framework
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A proven methodology to help you achieve sustainable growth
            and maximized ROI from your advertising campaigns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/20"
            >
              {/* Connector lines between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-10 w-20 h-0.5 bg-gradient-to-r from-gray-700 to-gray-600 z-0"></div>
              )}
              
              <div className={`w-14 h-14 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-br ${step.color} text-white`}>
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
              
              <div className="absolute top-6 right-6 text-4xl font-bold text-gray-700 opacity-20">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://calendly.com/shikharsharma/beyond-boring-discovery-call" 
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-md transition-all duration-300 text-lg shadow-lg hover:shadow-purple-500/20"
          >
            Start Your Growth Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default Framework;