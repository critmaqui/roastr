import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Get a taste of the roast',
      features: [
        'Connect Spotify Account',
        'Roast 1 playlist',
        'Basic roast analytics',
        'Limited roast content'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Premium',
      price: '$4.99',
      period: '/month',
      description: 'The full roasting experience',
      features: [
        'Unlimited playlist roasts',
        'Advanced roast analytics',
        'Shareable roast cards',
        'Access to roast history',
        'Priority in leaderboards',
        'Custom roast personalities',
        'No ads'
      ],
      cta: 'Go Premium',
      popular: true
    }
  ];

  return (
    <section id="pricing" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4 text-shadow">Pricing</h2>
          <p className="text-xl text-gray-400">Choose your roasting intensity</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`pricing-tier h-full ${plan.popular ? 'gradient-border' : ''}`}>
                <div className={`${plan.popular ? 'gradient-border-inner' : 'bg-gray-800 p-8 rounded-xl'} h-full flex flex-col`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      {plan.period && <span className="text-gray-400 ml-1">{plan.period}</span>}
                    </div>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-full font-medium transition-all duration-200 ${
                      plan.popular
                        ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/25'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;