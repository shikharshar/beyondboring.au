import React from 'react';
import { Check } from 'lucide-react';

const WhoWeAre = () => {
  const vibeItems = [
    { label: 'Professional', color: 'border-purple-500 text-purple-500' },
    { label: 'Bold', color: 'border-blue-500 text-blue-500' },
    { label: 'Creative', color: 'border-purple-400 text-purple-400' },
    { label: 'Minimalistic', color: 'border-gray-400 text-gray-400' },
  ];

  const founders = [
    {
      name: 'Shikhar Sharma',
      role: 'Growth Hacker',
    },
    {
      name: 'Kaish Yadav',
      role: 'Solving Problems',
    }
  ];

  const features = [
    'Results-driven approach',
    'Dedicated account management',
    'Trend-focused content creation'
  ];

  return (
    <section className="py-20 bg-gray-900" id="who-we-are">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          WHO WE ARE
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mt-4"></div>
        </h2>

        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Beyond Boring</span> is a creative marketing agency helping brands cut through the noise.
          </h3>

          <p className="text-gray-300 text-lg mb-12">
            With creative content strategies, expert video editing, and hands-on social
            management, we fuel Inorganic/organic growth that drives real ROI.
          </p>

          <div className="mb-12">
            <h4 className="text-2xl font-bold mb-4">Our Mission:</h4>
            <p className="text-gray-300 text-lg">
              To build magnetic brands that stand out, spark conversations, and scale
              confidently.
            </p>
          </div>

          <div className="mb-16">
            <h4 className="text-2xl font-bold mb-6">Our Vibe:</h4>
            <div className="flex flex-wrap gap-3 justify-center">
              {vibeItems.map((item, index) => (
                <span
                  key={index}
                  className={`px-4 py-2 border rounded-full ${item.color}`}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-3xl p-12 mt-16 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-12">Founded By:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {founders.map((founder, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-gray-800/50">
                  <h4 className="text-2xl font-bold text-white mb-2">{founder.name}</h4>
                  <p className="text-gray-400 text-lg">{founder.role}</p>
                </div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto mt-16">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 justify-center">
                    <Check className="text-purple-400" size={28} />
                    <span className="text-xl text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre; 