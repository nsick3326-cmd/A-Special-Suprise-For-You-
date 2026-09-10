import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomePage } from './pages/WelcomePage';
import { MemoriesPage } from './pages/MemoriesPage';
import { GamesPage } from './pages/GamesPage';
import { LetterPage } from './pages/LetterPage';
import { FinalePage } from './pages/FinalePage';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { NatureParticles } from './components/NatureParticles';
import { GlobalHoverEffects } from './components/GlobalHoverEffects';
import { AudioPermissionModal } from './components/AudioPermissionModal';
import { SecretModal } from './components/SecretModal';
import { LoadingScreen } from './components/LoadingScreen';
import { MusicProvider } from './context/MusicContext';
import { SoundProvider } from './context/SoundContext';
import { EasterEggProvider } from './context/EasterEggContext';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <MusicProvider>
        <SoundProvider>
          <EasterEggProvider>
            <div className="relative min-h-screen w-full overflow-x-hidden">
              {/* Global Magical Custom Cursor & Sparkle/Petal Hover System */}
              <GlobalHoverEffects />

              {loading ? (
                <LoadingScreen />
              ) : (
                <>
                  {/* Dynamic Particles */}
                  <NatureParticles count={28} />

                  {/* Top Navigation Bar */}
                  <Navbar />

                  {/* Modals */}
                  <AudioPermissionModal />
                  <SecretModal />

                  {/* Main Routes */}
                  <main className="relative z-10">
                    <Routes>
                      <Route path="/" element={<WelcomePage />} />
                      <Route path="/welcome" element={<WelcomePage />} />
                      <Route path="/memories" element={<MemoriesPage />} />
                      <Route path="/games" element={<GamesPage />} />
                      <Route path="/letter" element={<LetterPage />} />
                      <Route path="/finale" element={<FinalePage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>

                  {/* Music Player Widget */}
                  <MusicPlayer />
                </>
              )}
            </div>
          </EasterEggProvider>
        </SoundProvider>
      </MusicProvider>
    </Router>
  );
}
