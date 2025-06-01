import React from 'react';
import { Zap } from 'lucide-react';

const BoltButton: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[10px] right-[10px] w-[140px] p-[5px_13px] bg-black text-[#fff] text-[12px] rounded-full font-sans flex items-center gap-[5px] z-[1000000] font-[400] font-feature-settings-normal border border-bolt-blue animate-bolt-glow hover:shadow-glow-blue-lg hover:border-opacity-80 transition-all duration-300"
    >
      <Zap size={16} className="text-white" />
      BUILT ON BOLT
    </a>
  );
};

export default BoltButton;