import React from 'react';

// Import all images
import MetaAdsLogo from './Logos/MetaAdsLogo.png';
import GoogleAdsLogo from './Logos/GoogleAdsLogo.png';
import CopyWriting from './Logos/CopyWriting.png';
import LandingPage from './Logos/LandingPage.png';
import Funneloptimisation from './Logos/Funneloptimisation.png';
import WebsiteCreation from './Logos/WebsiteCreation.png';
import AiAutomation from './Logos/AiAutomation.png';
import SoftwareDevelopment from './Logos/SoftwareDevelopment.png';
import WebScraping from './Logos/WebScraping.png';

interface Service {
  name: string;
  icon?: string;
  imagePath: string;
}

const services: Service[] = [
  { name: 'Meta Ads', icon: '', imagePath: MetaAdsLogo },
  { name: 'Google Ads', icon: '🔎', imagePath: GoogleAdsLogo },
  { name: 'Ad Creatives/Copywriting', icon: '✍️', imagePath: CopyWriting },
  { name: 'Landing Page optimisation', icon: '🖥️', imagePath: LandingPage },
  { name: 'Funnel Optimisation', icon: '🔄', imagePath: Funneloptimisation },
  { name: 'Website Creation', icon: '🌐', imagePath: WebsiteCreation },
  { name: 'Personalised Ai Agents', icon: '🤖', imagePath: AiAutomation },
  { name: 'Software Development', icon: '💻', imagePath: SoftwareDevelopment },
  { name: 'Web Scraping', icon: '🕸️', imagePath: WebScraping },
];

const EverythingWeHelpWith: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Everything we help with
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our full suite of services to help you scale and automate your growth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={service.name}
              className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-2 group"
            >
              <div className="mb-2 w-full">
                {service.imagePath ? (
                  <img 
                    src={service.imagePath} 
                    alt={service.name}
                    className="w-32 h-32 object-contain mx-auto hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-4xl">{service.icon}</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EverythingWeHelpWith; 