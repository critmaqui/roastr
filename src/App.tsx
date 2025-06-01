import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import RoastExamples from './components/RoastExamples';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import BoltButton from './components/BoltButton';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load routes that aren't immediately needed
const SpotifyCallback = lazy(() => import('./components/SpotifyCallback'));
const PlaylistSelect = lazy(() => import('./components/PlaylistSelect'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner message="Loading..." />
          </div>
        }>
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
        </Suspense>
        <BoltButton />
      </div>
    </Router>
  );
}

export default App;