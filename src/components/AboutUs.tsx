import React, { useEffect, useRef } from 'react';
import { Linkedin, Twitter } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
  };
}

const AboutUs: React.FC = () => {
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

  const team: TeamMember[] = [
    {
      name: "Shikhar Sharma",
      position: "Co Founder",
      bio: "Former Growth Lead at Fortune 500 companies with 10+ years of experience in scaling brands through digital advertising.",
      image: "/Images/Shikhar2.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/shikharparhoon/",
        //twitter: "#"
      }
    },
    {
      name: "Kaish Yadav",
      position: "Co Founder",
      bio: "Renowned growth expert who has helped scale numerous startups to multi-million dollar valuations through innovative ad strategies.",
      image: "/Images/Kaish.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/kaish-yadav-92819421b/",
        //twitter: "#"
      }
    },
    {
      name: "Punnya Khanolkar",
      position: "Marketing coordinator",
      bio: "Blending hospitality insights with marketing expertise to create exceptional brand experiences.",
      image: "/Images/Punnya2.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/punnya-khanolkar-811535212/"
      }
    },
    {
      name: "Parijat Patil",
      position: "Creative Director",
      bio: "Award-winning creative with a background in developing high-converting ad campaigns for global brands.",
      image: "/Images/Photographer.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/parijat-patil-773b19176/"
      }
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
      
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 relative z-10 opacity-0 translate-y-10 transition-all duration-1000 max-w-7xl"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              About Us
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            World-class growth specialists with proven experience in scaling brands
            through innovative advertising strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 md:px-0">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg transition-all duration-500 hover:shadow-purple-500/20 hover:-translate-y-2 group"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{member.position}</p>
                <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                
                <div className="flex gap-3">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      className="bg-gray-800 p-2 rounded-full hover:bg-purple-500/20 transition-colors duration-300"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={18} className="text-gray-300" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      className="bg-gray-800 p-2 rounded-full hover:bg-purple-500/20 transition-colors duration-300"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter size={18} className="text-gray-300" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs; 