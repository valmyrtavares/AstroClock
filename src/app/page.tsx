'use client';

import React from 'react';
import { usePlanetPositions } from '../hooks/usePlanetPositions';
import { ZodiacWheel } from '../components/ZodiacWheel';
import { PlanetSidebar } from '../components/PlanetSidebar';
import { TimeControls } from '../components/TimeControls';
import { AspectModal } from '../components/AspectModal';
import { KnowledgeDrawer } from '../components/KnowledgeDrawer';
import { AuthorCard } from '../components/AuthorCard';
import { Compass, Sparkles, Menu, Printer, RotateCcw } from 'lucide-react';
import { AstralMapModal } from '../components/AstralMapModal';

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = React.useState(false);
  const [authorCardOpen, setAuthorCardOpen] = React.useState(false);
  const [astralModalOpen, setAstralModalOpen] = React.useState(false);
  const [astralData, setAstralData] = React.useState<{
    name: string;
    date: Date;
    city: string;
    state: string;
    country: string;
  } | null>(null);

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

  const handleGenerateAstralMap = React.useCallback((data: NonNullable<typeof astralData>) => {
    setAstralData(data);
    setDate(data.date);
    setIsPlaying(false);
  }, [setDate, setIsPlaying]);

  const handleResetToToday = React.useCallback(() => {
    setAstralData(null);
    setDate(new Date());
    setIsPlaying(true);
  }, [setDate, setIsPlaying]);

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
      
      {/* Print-only layout header */}
      {astralData && (
        <div className="hidden print-only flex-col items-center justify-center text-center pb-6 border-b border-gray-300 mb-6 text-black">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-black font-outfit">
            AstroClock
          </h1>
          <p className="text-sm font-semibold tracking-wider text-gray-600 uppercase mt-1">
            Mapa Astral de Nascimento
          </p>
          <div className="mt-4 px-6 py-3 border border-gray-300 rounded-xl bg-gray-50 max-w-xl text-center">
            <p className="text-lg font-bold text-gray-800">
              {astralData.name}
            </p>
            <p className="text-xs text-gray-600 mt-1 font-mono">
              Data: {astralData.date.toLocaleDateString('pt-BR')} às {astralData.date.toLocaleTimeString('pt-BR')}
            </p>
            <p className="text-xs text-gray-600 mt-0.5 font-mono">
              Local: {astralData.city}, {astralData.state} - {astralData.country}
            </p>
          </div>
        </div>
      )}

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

      {/* 1.5 Astral Map Pilgrim details panel */}
      {astralData && (
        <div className="glass-panel rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-950/30 via-pink-950/20 to-purple-950/30 border border-pink-500/20 shadow-lg shadow-pink-500/5 animate-fade-in no-print">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20 shrink-0">
              <Sparkles className="text-white w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-outfit uppercase tracking-widest text-pink-300">
                Mapa Astral de {astralData.name}
              </h2>
              <p className="text-xs text-purple-200 mt-0.5 leading-relaxed">
                Nascimento: <strong className="text-purple-100">{astralData.date.toLocaleDateString('pt-BR')} às {astralData.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</strong>
                <span className="mx-2 text-purple-500">•</span>
                Local: <strong className="text-purple-100">{astralData.city}, {astralData.state} - {astralData.country}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 border border-purple-400/30 text-white transition-all cursor-pointer shadow-md"
            >
              <Printer size={13} />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleResetToToday}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/20 text-purple-300 hover:text-purple-100 transition-all cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Voltar ao Hoje</span>
            </button>
          </div>
        </div>
      )}

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
        
        {/* Mobile-only Developer contact button */}
        <div className="mt-4 flex sm:hidden justify-center mb-4">
            <button
              onClick={() => setAuthorCardOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/30 transition-all duration-300 group"
            >
              <span className="text-[11px] font-semibold tracking-wider uppercase gold-shimmer-text text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                ✦ Desenvolvido por VALMYR TAVARES - Orçamentos ✦
              </span>
            </button>
        </div>
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
        onOpenAstralMap={() => setAstralModalOpen(true)}
      />

      {/* 6. Author Card */}
      <AuthorCard
        isOpen={authorCardOpen}
        onClose={() => setAuthorCardOpen(false)}
      />

      {/* 7. Astral Map Modal */}
      <AstralMapModal
        isOpen={astralModalOpen}
        onClose={() => setAstralModalOpen(false)}
        onGenerate={handleGenerateAstralMap}
      />

    </main>
  );
}
