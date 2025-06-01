import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Github, Mail, ArrowRight, Flame } from 'lucide-react';
import { loginWithSpotify } from '../lib/spotify';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { icon: <Twitter size={24} />, href: "https://twitter.com/roastr", label: "Twitter" },
    { icon: <Instagram size={24} />, href: "https://instagram.com/roastr", label: "Instagram" },
    { icon: <Github size={24} />, href: "https://github.com/roastr", label: "GitHub" },
    { icon: <Mail size={24} />, href: "mailto:hello@roastr.app", label: "Email" }
  ];

  const features = [
    { label: 'Roast Generator', action: loginWithSpotify },
    { label: 'Spotify Connect', action: loginWithSpotify },
    { label: 'Leaderboard', action: () => navigate('/leaderboard') },
    { label: 'Shareable Roasts', action: loginWithSpotify },
    { label: 'Roast History', badge: 'soon' }
  ];

  const quickLinks = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Features', action: () => scrollToSection('features') },
    { label: 'Get Roasted', action: loginWithSpotify },
    { label: 'Pricing', action: () => scrollToSection('pricing') },
    { label: 'Contact', action: () => window.location.href = 'mailto:hello@roastr.app' }
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 text-8xl opacity-5 font-display"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🔥
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10 text-6xl opacity-5 font-display"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        💀
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* About Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-2xl mb-6 flex items-center gap-2">
              <Flame className="text-orange-neon" size={24} />
              <span>ABOUT ROASTR</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your AI-powered playlist roast tool. We turn your questionable music taste into brutally
              honest, personalized roasts — powered by OpenAI and Spotify.
            </p>
            <motion.button
              onClick={loginWithSpotify}
              className="group inline-flex items-center gap-2 text-orange-neon hover:text-pink-neon transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="font-bold uppercase tracking-wider">Get Started</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Features Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-2xl mb-6">FEATURES</h3>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={feature.action}
                    disabled={!!feature.badge}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-orange-neon/50">›</span>
                    <span>{feature.label}</span>
                    {feature.badge && (
                      <span className="text-xs bg-gradient-to-r from-orange-neon to-pink-neon text-black px-2 py-0.5 rounded-full font-bold">
                        {feature.badge}
                      </span>
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-display text-2xl mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={link.action}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-pink-neon/50">›</span>
                    <span>{link.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center items-center gap-8 mb-12 pt-8 border-t border-gray-900"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <div className="text-gray-500 group-hover:text-white transition-colors duration-300">
                {social.icon}
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-neon to-pink-neon rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                whileHover={{ scale: 1.5 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <h4 className="font-display text-xl mb-4">
            <span className="gradient-text-multi animate-gradient-shift">STAY TOASTED</span>
          </h4>
          <p className="text-gray-400 mb-6">Get the hottest roasts delivered to your inbox</p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-neon transition-colors"
            />
            <motion.button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-orange-neon to-pink-neon text-black font-bold uppercase rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center pt-8 border-t border-gray-900"
        >
          <p className="text-gray-500 text-sm font-body uppercase tracking-wider">
            2024 © ROASTR. BUILT WITH{' '}
            <motion.span
              className="inline-block text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ♥
            </motion.span>
            {' '}AND{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔥
            </motion.span>
          </p>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-neon/5 via-transparent to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;