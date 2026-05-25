'use client';

import React from 'react';
import { PlanetsData, PlanetData } from '../hooks/usePlanetPositions';
import { PLANET_STYLE_MAPPING } from './PlanetMarker';

interface PlanetSidebarProps {
  planets: PlanetsData | null;
  selectedPlanet: string | null;
  onSelectPlanet: (planetKey: string | null) => void;
  loading: boolean;
}

// Astrological Formatter
export function formatAstrologicalPosition(longitude: number, symbol: string) {
  const degInSign = longitude % 30;
  const deg = Math.floor(degInSign);
  const min = Math.floor((degInSign % 1) * 60);
  return `${String(deg).padStart(2, '0')}° ${symbol} ${String(min).padStart(2, '0')}'`;
}

export function PlanetSidebar({
  planets,
  selectedPlanet,
  onSelectPlanet,
  loading
}: PlanetSidebarProps) {
  
  if (loading || !planets) {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 h-[600px] animate-pulse">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        <span className="text-sm text-purple-300 font-medium">Lendo Efemérides...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-4 max-h-[calc(100vh-140px)] lg:max-h-none">
      {/* Header Info */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold font-outfit tracking-wide text-purple-200">
            Celestial Positions
          </h2>
          <p className="text-[11px] text-purple-400 uppercase tracking-widest font-medium">
            Geocentric Ecliptic
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold uppercase tracking-wider animate-pulse">
          Live Data
        </span>
      </div>

      {/* Planets List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[480px] lg:max-h-[60vh] scrollbar-thin">
        {Object.entries(planets).map(([key, data]) => {
          const isSelected = selectedPlanet === key;
          const style = PLANET_STYLE_MAPPING[key] || {
            symbol: '?',
            color: '#ffffff',
            glow: 'rgba(255,255,255,0.1)',
            desc: ''
          };

          return (
            <div
              key={key}
              onClick={() => onSelectPlanet(isSelected ? null : key)}
              className={`glass-panel glass-panel-hover rounded-xl p-3 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                isSelected 
                  ? 'border-pink-500/40 bg-purple-950/20 shadow-md shadow-pink-500/5' 
                  : ''
              }`}
            >
              {/* Highlight backdrop overlay */}
              {isSelected && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-5"
                  style={{ background: `radial-gradient(circle at 100% 50%, ${style.color}, transparent 60%)` }}
                />
              )}

              <div className="flex items-center justify-between">
                {/* Left side: Glyph, Name, Description */}
                <div className="flex items-center space-x-3 z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xl font-bold font-sans transition-all duration-300"
                    style={{
                      backgroundColor: isSelected ? style.glow : 'rgba(139, 92, 246, 0.05)',
                      color: isSelected ? '#ffffff' : style.color,
                      boxShadow: isSelected ? `0 0 10px ${style.glow}` : 'none'
                    }}
                  >
                    {style.symbol}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-semibold text-sm tracking-wide text-purple-100 group-hover:text-purple-300 transition-colors">
                        {data.name}
                      </span>
                      {data.retrograde && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-widest">
                          ℞
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-purple-400 truncate max-w-[150px] block lg:max-w-none">
                      {data.sign}
                    </span>
                  </div>
                </div>

                {/* Right side: Coordinates and Speed */}
                <div className="text-right z-10">
                  <div 
                    className="font-mono text-xs font-medium tracking-wide uppercase transition-colors"
                    style={{ color: isSelected ? '#f472b6' : '#d8b4fe' }}
                  >
                    {formatAstrologicalPosition(data.longitude, data.symbol)}
                  </div>
                  <div className="text-[10px] text-purple-400 mt-0.5 font-mono">
                    {data.speed > 0 ? '+' : ''}
                    {data.speed.toFixed(3)}°/d
                  </div>
                </div>
              </div>

              {/* Expandable astrological significance details */}
              {isSelected && style.desc && (
                <div className="mt-3 pt-2.5 border-t border-purple-500/10 text-[11px] text-purple-300 leading-relaxed font-sans z-10 relative">
                  <strong className="text-purple-200">Influence: </strong> 
                  {style.desc}
                  <div className="mt-1 text-[9px] text-purple-400">
                    Calculated geocentric ecliptic longitude: {data.longitude.toFixed(2)}°
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info card footer */}
      <div className="glass-panel rounded-2xl p-3.5 text-[10px] text-purple-400 leading-relaxed">
        <p className="font-medium text-purple-300 mb-1 flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-cosmic-purple" />
          Zodiac Alignment Info
        </p>
        Positions represent actual astronomical coordinates relative to the Earth (Geocentric Ecliptic of Date). Highlight a planet to view its active aspects on the clock wheel.
      </div>
    </div>
  );
}
