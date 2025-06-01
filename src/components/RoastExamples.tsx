import React from 'react';

type RoastExampleProps = {
  text: string;
};

const RoastExample: React.FC<RoastExampleProps> = ({ text }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 transition-all duration-300 hover:border-orange-500 hover:shadow-glow-orange group">
      <p className="text-gray-200 text-lg italic group-hover:text-white transition-colors duration-300">"{text}"</p>
    </div>
  );
};

const RoastExamples: React.FC = () => {
  const examples = [
    "This playlist sounds like an emotional support clown car.",
    "We found 3 songs from Glee. Seek help.",
    "Your taste in music is like a kazoo at a funeral — inappropriate and confusing to everyone.",
    "Congratulations on having the exact same music taste as a suburban dad going through his third midlife crisis.",
    "This playlist has the emotional range of a teaspoon and the creativity of beige wallpaper.",
    "You've somehow managed to create a playlist that's both basic and weird at the same time. Impressive."
  ];

  return (
    <section className="bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center text-shadow">Roast Samples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <RoastExample key={index} text={example} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoastExamples;