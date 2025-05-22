import React from 'react';

const services = [
  { name: 'Meta Ads', icon: '📊' },
  { name: 'Google Ads', icon: '🔎' },
  { name: 'Ad Creatives/Copywriting', icon: '✍️' },
  { name: 'Landing Page optimisation', icon: '🖥️' },
  { name: 'Funnel Optimisation', icon: '🔄' },
  { name: 'Website Creation', icon: '🌐' },
  { name: 'Personalised Ai Agents', icon: '🤖' },
  { name: 'Software Development', icon: '💻' },
  { name: 'Web Scraping', icon: '🕸️' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={service.name}
              className="bg-gray-900 rounded-xl border border-gray-700 shadow-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-purple-500/20 hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
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