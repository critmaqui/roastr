import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import RoastExamples from './components/RoastExamples';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import BoltButton from './components/BoltButton';
import SpotifyCallback from './components/SpotifyCallback';
import PlaylistSelect from './components/PlaylistSelect';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Features />
              <Pricing />
              <RoastExamples />
              <CTASection />
              <Footer />
            </>
          } />
          <Route path="/callback" element={<SpotifyCallback />} />
          <Route path="/playlist-select" element={<PlaylistSelect />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
        <BoltButton />
      </div>
    </Router>
  );
}

export default App;