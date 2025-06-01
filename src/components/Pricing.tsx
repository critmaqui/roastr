import React from 'react';

type PricingTierProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
};

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  isPopular = false 
}) => {
  return (
    <div className={`
      pricing-tier bg-gray-900 rounded-lg overflow-hidden
      ${isPopular ? 'border-2 border-orange-500 shadow-glow-orange' : 'border border-gray-800'}
      hover:shadow-glow-orange-lg
    `}>
      {isPopular && (
        <div className="bg-orange-500 text-center py-1 text-white font-medium">
          MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-extrabold text-white">{price}</span>
          {price !== 'Free' && <span className="ml-1 text-gray-400">/month</span>}
        </div>
        <p className="text-gray-300 mb-6">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        <button className={`
          w-full py-3 px-4 rounded-full font-medium transition-all duration-300
          ${isPopular 
            ? 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-glow-orange' 
            : 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-glow-orange'}
        `}>
          {isPopular ? '🔥 Get Premium' : 'Start Free'}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center text-shadow">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingTier
            name="Free"
            price="Free"
            description="Get a taste of the roast."
            features={[
              "Connect Spotify Account",
              "Roast 1 playlist",
              "Basic roast analytics",
              "Limited roast options"
            ]}
          />
          <PricingTier
            name="Premium"
            price="$4.99"
            description="The full roasting experience."
            features={[
              "Unlimited playlist roasts",
              "Advanced roast analytics",
              "Shareable roast cards",
              "Access to roast history",
              "Priority in leaderboards"
            ]}
            isPopular={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;