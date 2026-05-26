'use client';

import React from 'react';
import { usePlanetPositions } from '../hooks/usePlanetPositions';
import { ZodiacWheel } from '../components/ZodiacWheel';
import { PlanetSidebar } from '../components/PlanetSidebar';
import { TimeControls } from '../components/TimeControls';
import { AspectModal } from '../components/AspectModal';
import { KnowledgeDrawer } from '../components/KnowledgeDrawer';
import { AuthorCard } from '../components/AuthorCard';
import { Compass, Sparkles, Menu } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = React.useState(false);
  const [authorCardOpen, setAuthorCardOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const {
    planets,
    loading,
    error,
    date,
    isPlaying,
    simulationSpeed,
    selectedPlanet,
    setSelectedPlanet,
    setDate,
    setIsPlaying,
    setSimulationSpeed,
    refetch
  } = usePlanetPositions();

  if (!mounted) {
    return (
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-6 flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
            <Compass className="text-white w-6 h-6" />
          </div>
          <p className="text-sm text-purple-300 font-medium tracking-widest uppercase animate-pulse">
            Carregando AstroClock...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-6 flex flex-col justify-between space-y-4 md:space-y-6 min-h-screen overflow-x-hidden">
      
      {/* 1. Header Navigation Glassmorphic Panel */}
      <header className="glass-panel rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side: Knowledge button + Title Brand */}
        <div className="flex items-center space-x-3">
          {/* Knowledge Drawer toggle */}
          <button
            onClick={() => setKnowledgeOpen(true)}
            className="w-12 h-12 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/15 hover:border-purple-500/30 flex items-center justify-center transition-all duration-300 group cursor-pointer"
            aria-label="Guia Astrológico"
            title="Guia Astrológico"
          >
            <Menu size={22} className="text-purple-400 group-hover:text-purple-200 transition-colors" />
          </button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20 glow-border-purple">
            <Compass className="text-white w-5 h-5 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-outfit tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-pink-200">
              AstroClock
            </h1>
            <p className="text-[10px] text-purple-400 font-medium tracking-widest uppercase flex items-center gap-1">
              <Sparkles size={8} className="text-pink-400" />
              Real-time Ephemeris & Zodiac Visualizer
            </p>
          </div>
        </div>

        {/* Right side: Error or Author Branding */}
        <div className="flex items-center space-x-3">
          {error ? (
            <button 
              onClick={refetch}
              className="px-3 py-1.5 rounded-xl bg-red-950/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-500/10 transition-colors"
            >
              Erro ao Carregar: Tentar Novamente
            </button>
          ) : (
            <button
              onClick={() => setAuthorCardOpen(true)}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-[10px] font-semibold tracking-wider uppercase gold-shimmer-text text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 group-hover:from-amber-200 group-hover:via-yellow-100 group-hover:to-amber-200 transition-all">
                ✦ Desenvolvido por VALMYR TAVARES
              </span>
            </button>
          )}
        </div>
      </header>

      {/* 2. Main Content Grid (Central Wheel vs Sidebar) */}
      <div className="grid grid-cols-12 gap-6 items-start flex-1 w-full">
        {/* Left Column: Central Zodiac Wheel Visualizer (8/12 on large, 12/12 on mobile) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center glass-panel rounded-3xl p-4 md:p-6 shadow-xl relative overflow-hidden w-full aspect-square lg:h-full lg:aspect-auto lg:min-h-[620px]">
          {/* Subtle starry circular highlights in background */}
          <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center">
            <div className="w-[450px] h-[450px] rounded-full border border-purple-500/5 animate-breath" />
            <div className="w-[600px] h-[600px] absolute rounded-full border border-pink-500/5 animate-breath" style={{ animationDelay: '2s' }} />
          </div>

          <ZodiacWheel
            planets={planets}
            selectedPlanet={selectedPlanet}
            onSelectPlanet={setSelectedPlanet}
          />
        </div>

        {/* Right Column: Planetary Sidebar Coordinates List (4/12 on large, 12/12 on mobile) */}
        <div className="col-span-12 lg:col-span-4 h-full">
          <PlanetSidebar
            planets={planets}
            selectedPlanet={selectedPlanet}
            onSelectPlanet={setSelectedPlanet}
            loading={loading}
          />
        </div>
      </div>

      {/* 3. Bottom Controls Cockpit Deck */}
      <footer className="w-full">
        <TimeControls
          date={date}
          setDate={setDate}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          simulationSpeed={simulationSpeed}
          setSimulationSpeed={setSimulationSpeed}
        />
      </footer>

      {/* 4. Aspect Modal Window overlay */}
      {selectedPlanet && (
        <AspectModal
          planets={planets}
          selectedPlanet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {/* 5. Knowledge Drawer */}
      <KnowledgeDrawer
        isOpen={knowledgeOpen}
        onClose={() => setKnowledgeOpen(false)}
      />

      {/* 6. Author Card */}
      <AuthorCard
        isOpen={authorCardOpen}
        onClose={() => setAuthorCardOpen(false)}
      />

    </main>
  );
}
