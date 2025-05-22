import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What's your model? How do we start?",
      answer: "We start with a 2 week \"Sprint\" where we do a full audit and analysis of your ad strategy. From there, you can choose to work work with us on the implementation."
    },
    {
      question: "Why do you call it \"Boring\"?",
      answer: "We think success looks a lot like doing the boring things really really well. Digging into data, running A/B tests, and experimenting with new tech."
    },
    {
      question: "How do you charge?",
      answer: "We bill flat, simple retainers. No percentage of ad spend."
    },
    {
      question: "Is this a long-term committment?",
      answer: "After a 3-month minimum, it's month to month."
    },
    {
      question: "How long to see results?",
      answer: "We usually start seeing significant improvements within the first month of campaign launch, but this can vary by company, industry, offer, etc."
    },
    {
      question: "Do you handle creative?",
      answer: "Yes! We have a creative team that specializes in digital ads."
    },
    {
      question: "What makes you different from other agencies?",
      answer: "Our closeness to the data, our innovative AI workflows, our proven results, and our stellar team."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Frequently Asked Questions
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`px-6 transition-all duration-200 ease-in-out ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                } overflow-hidden`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 