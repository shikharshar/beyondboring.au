import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  features,
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.classList.add('opacity-100', 'translate-y-0');
              }
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-purple-500/10 transition-all duration-500 opacity-0 translate-y-10 group"
    >
      <div className="bg-gray-900/60 rounded-lg p-3 inline-block mb-4 group-hover:bg-gray-900/80 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 mb-5">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="bg-purple-500/20 p-1 rounded-full text-purple-400 mt-0.5">
              <Check size={12} />
            </span>
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;