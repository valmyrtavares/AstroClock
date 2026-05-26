'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle, ChevronDown } from 'lucide-react';
import { PlanetsData } from '../hooks/usePlanetPositions';
import { PLANET_STYLE_MAPPING } from './PlanetMarker';
import { formatAstrologicalPosition } from './PlanetSidebar';
import { getAspectInterpretation, getPlanetInSignInterpretation } from '../data/interpretations';

interface AspectModalProps {
  planets: PlanetsData | null;
  selectedPlanet: string | null;
  onClose: () => void;
}

const PLANET_TRANSLATIONS: Record<string, string> = {
  sun: 'Sol',
  moon: 'Lua',
  mercury: 'Mercúrio',
  venus: 'Vênus',
  mars: 'Marte',
  jupiter: 'Júpiter',
  saturn: 'Saturno',
  uranus: 'Urano',
  neptune: 'Netuno',
  pluto: 'Plutão'
};

const ZODIAC_TRANSLATIONS: Record<string, string> = {
  Aries: 'Áries',
  Taurus: 'Touro',
  Gemini: 'Gêmeos',
  Cancer: 'Câncer',
  Leo: 'Leão',
  Virgo: 'Virgem',
  Libra: 'Libra',
  Scorpio: 'Escorpião',
  Sagittarius: 'Sagitário',
  Capricorn: 'Capricórnio',
  Aquarius: 'Aquário',
  Pisces: 'Peixes'
};

const ASPECTS_CONFIG = [
  { type: 'conjunction', target: 0, orb: 8, color: '#fbbf24', label: 'Conjunção', translation: 'Conjunção' },
  { type: 'sextile', target: 60, orb: 6, color: '#10b981', label: 'Sextil', translation: 'Sextil' },
  { type: 'square', target: 90, orb: 8, color: '#ef4444', label: 'Quadratura', translation: 'Quadratura' },
  { type: 'trine', target: 120, orb: 8, color: '#3b82f6', label: 'Trígono', translation: 'Trígono' },
  { type: 'opposition', target: 180, orb: 8, color: '#a855f7', label: 'Oposição', translation: 'Oposição' }
];

export function AspectModal({ planets, selectedPlanet, onClose }: AspectModalProps) {
  const [expandedAspect, setExpandedAspect] = useState<number | null>(null);

  // Calculate aspects for the selected planet
  const selectedAspects = React.useMemo(() => {
    if (!planets || !selectedPlanet) return [];
    
    const aspects = [];
    const selectedData = planets[selectedPlanet];
    if (!selectedData) return [];

    const keys = Object.keys(planets);
    for (const key of keys) {
      if (key === selectedPlanet) continue;
      const otherData = planets[key];
      if (!otherData) continue;

      const lon1 = selectedData.longitude;
      const lon2 = otherData.longitude;

      // Shortest angular distance
      let diff = Math.abs(lon1 - lon2);
      if (diff > 180) diff = 360 - diff;

      // Check against aspect configurations
      for (const config of ASPECTS_CONFIG) {
        const distanceToTarget = Math.abs(diff - config.target);
        if (distanceToTarget <= config.orb) {
          aspects.push({
            p1: selectedPlanet,
            p2: key,
            type: config.type,
            angleDiff: diff,
            targetAngle: config.target,
            label: config.translation,
            color: config.color,
            orbUsed: distanceToTarget,
            p1Data: selectedData,
            p2Data: otherData
          });
          break; // only one aspect possible between a pair
        }
      }
    }
    
    // Sort aspects by orb (tightest aspects first)
    return aspects.sort((a, b) => a.orbUsed - b.orbUsed);
  }, [planets, selectedPlanet]);

  if (!selectedPlanet || !planets) return null;

  const currentPlanetData = planets[selectedPlanet];
  const currentPlanetStyle = PLANET_STYLE_MAPPING[selectedPlanet] || {
    symbol: '?',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.1)',
    desc: ''
  };

  const translatedPlanetName = PLANET_TRANSLATIONS[selectedPlanet] || currentPlanetData.name;
  const translatedZodiacSign = ZODIAC_TRANSLATIONS[currentPlanetData.sign] || currentPlanetData.sign;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Dialog Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-xl glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-purple-500/20 max-h-[90vh] flex flex-col"
        >
          {/* Header Panel */}
          <div 
            className="px-6 py-5 flex items-center justify-between border-b border-purple-500/10 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.03))`
            }}
          >
            {/* Ambient accent light */}
            <div 
              className="absolute -right-12 -top-12 w-32 h-32 rounded-full opacity-20 pointer-events-none blur-2xl"
              style={{ backgroundColor: currentPlanetStyle.color }}
            />

            <div className="flex items-center space-x-3.5 z-10">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-3xl font-bold font-sans"
                style={{
                  backgroundColor: currentPlanetStyle.glow,
                  color: '#ffffff',
                  boxShadow: `0 0 15px ${currentPlanetStyle.glow}`,
                  textShadow: `0 0 8px rgba(255,255,255,0.5)`
                }}
              >
                {currentPlanetStyle.symbol}
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit text-purple-100 flex items-center gap-2">
                  Relações de {translatedPlanetName}
                </h3>
                <p className="text-xs text-purple-400 font-mono">
                  Posicionado a {formatAstrologicalPosition(currentPlanetData.longitude, currentPlanetData.symbol)} em {translatedZodiacSign}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-purple-950/20 text-purple-300 border border-purple-500/10 flex items-center justify-center hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/30 transition-all duration-300 z-10"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body Content - Scrollable Aspect List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[50vh] scrollbar-thin">
            {selectedAspects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/25 border border-purple-500/10 flex items-center justify-center text-purple-400">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-purple-200">Nenhum aspecto ativo</h4>
                  <p className="text-xs text-purple-400 max-w-sm mt-1 leading-relaxed">
                    {translatedPlanetName} não possui aspectos significativos (conjunção, sextil, quadratura, trígono ou oposição) com outros planetas no momento.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[10px] text-purple-400 uppercase tracking-widest font-semibold block mb-1">
                  Aspectos Ativos ({selectedAspects.length})
                </span>
                
                {selectedAspects.map((aspect, idx) => {
                  const p2Style = PLANET_STYLE_MAPPING[aspect.p2] || { symbol: '?', color: '#fff' };
                  const p2Name = PLANET_TRANSLATIONS[aspect.p2] || aspect.p2Data.name;
                  const p2Zodiac = ZODIAC_TRANSLATIONS[aspect.p2Data.sign] || aspect.p2Data.sign;

                  const isExpanded = expandedAspect === idx;
                  return (
                    <motion.div
                      key={`aspect-card-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="glass-panel rounded-2xl border border-purple-500/5 hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden group cursor-pointer"
                      onClick={() => setExpandedAspect(isExpanded ? null : idx)}
                    >
                      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Left: Origin Planet Info */}
                        <div className="flex items-center space-x-2.5 min-w-[120px]">
                          <span className="text-xl text-purple-100" style={{ color: currentPlanetStyle.color }}>
                            {currentPlanetStyle.symbol}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-purple-200">{translatedPlanetName}</span>
                            <span className="text-[10px] text-purple-400 font-mono">
                              {formatAstrologicalPosition(aspect.p1Data.longitude, aspect.p1Data.symbol).split(' ')[0]} {aspect.p1Data.symbol}
                            </span>
                          </div>
                        </div>

                        {/* Middle: Aspect Connector Badge */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center relative">
                          <div 
                            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 flex items-center gap-1.5"
                            style={{ 
                              color: aspect.color, 
                              borderColor: `${aspect.color}35`,
                              backgroundColor: `${aspect.color}12`,
                              boxShadow: `0 0 10px ${aspect.color}10`
                            }}
                          >
                            {aspect.label}
                            <ChevronDown size={12} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </div>
                          <span className="text-[9px] text-purple-400/80 font-mono mt-1">
                            Separamento: {aspect.angleDiff.toFixed(1)}° (Orb: {aspect.orbUsed.toFixed(1)}°)
                          </span>
                        </div>

                        {/* Right: Target Planet Info */}
                        <div className="flex items-center justify-end space-x-2.5 min-w-[120px] text-right">
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-purple-200">{p2Name}</span>
                            <span className="text-[10px] text-purple-400 font-mono">
                              {formatAstrologicalPosition(aspect.p2Data.longitude, aspect.p2Data.symbol).split(' ')[0]} {aspect.p2Data.symbol}
                            </span>
                          </div>
                          <span className="text-xl" style={{ color: p2Style.color }}>
                            {p2Style.symbol}
                          </span>
                        </div>
                      </div>

                      {/* Expanded Interpretation Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-1 border-t border-white/5">
                              <p className="text-xs text-purple-200 leading-relaxed text-left bg-black/20 p-3 rounded-xl">
                                {getAspectInterpretation(translatedPlanetName, p2Name, aspect.label)}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Planet in Sign Interpretation Block */}
            <div className="mt-6 pt-6 border-t border-purple-500/10">
              <span className="text-[10px] text-pink-400 uppercase tracking-widest font-semibold block mb-3 flex items-center gap-1.5">
                <Sparkles size={12} />
                {translatedPlanetName} em {translatedZodiacSign}
              </span>
              <div className="glass-panel rounded-2xl p-4 border border-pink-500/10 bg-gradient-to-br from-purple-900/10 to-pink-900/5">
                <p className="text-sm text-purple-100 leading-relaxed text-left whitespace-pre-wrap">
                  {getPlanetInSignInterpretation(translatedPlanetName, translatedZodiacSign)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Panel */}
          <div className="px-6 py-4 bg-purple-950/20 border-t border-purple-500/10 flex items-center justify-between text-[10px] text-purple-400 leading-relaxed font-sans">
            <span className="flex items-center gap-1.5 font-medium text-purple-300">
              <Sparkles size={10} className="text-pink-400 animate-pulse" />
              Influências e Orbes Ativas
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/35 hover:text-white transition-all duration-300"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
