import React from 'react';
import { Music, Twitter, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Roastr</h3>
            <p className="text-gray-300">
              Roastr is your AI-powered playlist roast tool. We turn your questionable music taste into brutally
              honest, personalized roasts — powered by OpenAI and Spotify.
            </p>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Roast Generator
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Spotify Connect
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Leaderboard
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Shareable Roasts
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Roast History (soon)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Get Roasted
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-8">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Music size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          2024 © ROASTR. BUILT WITH LOVE AND RAGE.
        </div>
      </div>
    </footer>
  );
};

export default Footer;