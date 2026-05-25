'use client';

import React from 'react';
import { PlanetsData } from '../hooks/usePlanetPositions';
import { PlanetMarker } from './PlanetMarker';
import { AspectLines } from './AspectLines';

interface ZodiacWheelProps {
  planets: PlanetsData | null;
  selectedPlanet: string | null;
  onSelectPlanet: (planetKey: string | null) => void;
}

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', color: 'from-amber-500/10 to-transparent' },
  { name: 'Taurus', symbol: '♉', color: 'from-emerald-500/10 to-transparent' },
  { name: 'Gemini', symbol: '♊', color: 'from-cyan-500/10 to-transparent' },
  { name: 'Cancer', symbol: '♋', color: 'from-blue-500/10 to-transparent' },
  { name: 'Leo', symbol: '♌', color: 'from-orange-500/10 to-transparent' },
  { name: 'Virgo', symbol: '♍', color: 'from-pink-500/10 to-transparent' },
  { name: 'Libra', symbol: '♎', color: 'from-teal-500/10 to-transparent' },
  { name: 'Scorpio', symbol: '♏', color: 'from-purple-500/10 to-transparent' },
  { name: 'Sagittarius', symbol: '♐', color: 'from-red-500/10 to-transparent' },
  { name: 'Capricorn', symbol: '♑', color: 'from-slate-500/10 to-transparent' },
  { name: 'Aquarius', symbol: '♒', color: 'from-indigo-500/10 to-transparent' },
  { name: 'Pisces', symbol: '♓', color: 'from-rose-500/10 to-transparent' }
];

// Constants for SVG Layout
const SIZE = 900;
const CENTER = SIZE / 2;
const OUTER_RADIUS = 420;
const INNER_RADIUS = 360;
const BOUNDARY_RADIUS = 380;

// Planet Orbits Radii (mapping out from innermost to outermost)
export const ORBIT_MAPPING: Record<string, number> = {
  moon: 120,
  mercury: 145,
  venus: 170,
  sun: 195,
  mars: 220,
  jupiter: 245,
  saturn: 270,
  uranus: 295,
  neptune: 320,
  pluto: 345
};

export function ZodiacWheel({ planets, selectedPlanet, onSelectPlanet }: ZodiacWheelProps) {
  // Helper to draw SVG pie-slice paths
  const getSectorPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1_out = CENTER + outerR * Math.cos(startRad);
    const y1_out = CENTER + outerR * Math.sin(startRad);
    const x2_out = CENTER + outerR * Math.cos(endRad);
    const y2_out = CENTER + outerR * Math.sin(endRad);
    
    const x1_in = CENTER + innerR * Math.cos(startRad);
    const y1_in = CENTER + innerR * Math.sin(startRad);
    const x2_in = CENTER + innerR * Math.cos(endRad);
    const y2_in = CENTER + innerR * Math.sin(endRad);

    return `
      M ${x1_in} ${y1_in} 
      L ${x1_out} ${y1_out} 
      A ${outerR} ${outerR} 0 0 1 ${x2_out} ${y2_out} 
      L ${x2_in} ${y2_in} 
      A ${innerR} ${innerR} 0 0 0 ${x1_in} ${y1_in} 
      Z
    `;
  };

  // Render 360 ticks for degrees (every 5° has a medium tick, every 30° has a segment boundary, others have small ticks)
  const renderDegreeTicks = () => {
    const ticks = [];
    for (let i = 0; i < 360; i += 2) {
      if (i % 30 === 0) continue; // Boundary lines drawn separately
      
      const rad = (i * Math.PI) / 180;
      const isFive = i % 5 === 0;
      const tickLength = isFive ? 8 : 4;
      
      const x1 = CENTER + INNER_RADIUS * Math.cos(rad);
      const y1 = CENTER + INNER_RADIUS * Math.sin(rad);
      const x2 = CENTER + (INNER_RADIUS + tickLength) * Math.cos(rad);
      const y2 = CENTER + (INNER_RADIUS + tickLength) * Math.sin(rad);

      ticks.push(
        <line
          key={`tick-${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={isFive ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.15)'}
          strokeWidth={isFive ? 1.5 : 1}
        />
      );
    }
    return ticks;
  };

  return (
    <div className="w-full h-full flex items-center justify-center select-none relative p-4 max-w-[85vh] mx-auto aspect-square">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-full drop-shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-transform duration-500 ease-out"
        id="zodiac-svg"
      >
        <defs>
          {/* Neon Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Subtle Sector Gradients */}
          {ZODIAC_SIGNS.map((sign, idx) => (
            <radialGradient
              id={`grad-${idx}`}
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
              key={`gradient-${idx}`}
            >
              <stop offset="60%" stopColor="rgba(10, 6, 22, 0.6)" />
              <stop offset="90%" stopColor="rgba(139, 92, 246, 0.05)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.15)" />
            </radialGradient>
          ))}
          
          {/* Central Core Gradient */}
          <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.15)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.05)" />
            <stop offset="100%" stopColor="rgba(4, 2, 10, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Orbiting Ring Backgrounds */}
        <circle cx={CENTER} cy={CENTER} r={OUTER_RADIUS} fill="none" stroke="rgba(139, 92, 246, 0.12)" strokeWidth="1" />
        <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS} fill="rgba(8, 4, 20, 0.4)" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="2" />

        {/* 1. Zodiac Segments (Slices) */}
        <g id="zodiac-segments">
          {ZODIAC_SIGNS.map((sign, idx) => {
            const startAngle = idx * 30;
            const endAngle = (idx + 1) * 30;
            const midAngle = startAngle + 15;
            const midRad = (midAngle * Math.PI) / 180;
            
            // Label coordinates
            const labelR = (INNER_RADIUS + OUTER_RADIUS) / 2;
            const lx = CENTER + labelR * Math.cos(midRad);
            const ly = CENTER + labelR * Math.sin(midRad);

            // Sector path
            const d = getSectorPath(startAngle, endAngle, INNER_RADIUS, OUTER_RADIUS);
            
            // Checking if any planet is in this sign to light it up slightly
            const planetsInSign = planets 
              ? Object.values(planets).filter(p => p.sign === sign.name).length 
              : 0;

            return (
              <g key={`segment-${idx}`} className="group cursor-pointer">
                {/* Sector Path */}
                <path
                  d={d}
                  fill={`url(#grad-${idx})`}
                  stroke="rgba(139, 92, 246, 0.12)"
                  strokeWidth="1.5"
                  className="zodiac-sector transition-all duration-300"
                />
                
                {/* Visual glow backdrop for sectors containing planets */}
                {planetsInSign > 0 && (
                  <path
                    d={d}
                    fill="rgba(139, 92, 246, 0.02)"
                    pointerEvents="none"
                  />
                )}

                {/* Outer Sign Symbol and Name */}
                <text
                  x={lx}
                  y={ly + 12}
                  textAnchor="middle"
                  className="fill-purple-300 font-medium transition-transform duration-300 group-hover:scale-125 group-hover:fill-cosmic-pink"
                  style={{ fontSize: '32px' }}
                >
                  {sign.symbol}
                </text>
                
                {/* Inner Sign Name tooltip helper on hover (small text) */}
                <text
                  x={lx}
                  y={ly + 32}
                  textAnchor="middle"
                  className="fill-purple-400/0 text-[9px] tracking-wider uppercase pointer-events-none transition-all duration-300 group-hover:fill-purple-300"
                >
                  {sign.name.slice(0, 3)}
                </text>
              </g>
            );
          })}
        </g>

        {/* 2. Degree ticks */}
        <g id="degree-ticks">{renderDegreeTicks()}</g>

        {/* 3. Concentric Orbit Tracks for Planets */}
        <g id="orbit-tracks">
          {Object.entries(ORBIT_MAPPING).map(([key, r]) => {
            const isHighlighted = selectedPlanet === key;
            return (
              <circle
                key={`orbit-${key}`}
                cx={CENTER}
                cy={CENTER}
                r={r}
                fill="none"
                stroke={isHighlighted ? 'rgba(236, 72, 153, 0.25)' : 'rgba(139, 92, 246, 0.06)'}
                strokeWidth={isHighlighted ? 1.5 : 1}
                strokeDasharray={key === 'moon' ? '2 2' : '4 4'}
                className="transition-colors duration-300"
              />
            );
          })}
        </g>

        {/* 4. Aspect Lines (Placeholder overlay ready for trines, squares, sextiles, oppositions) */}
        {planets && <AspectLines planets={planets} selectedPlanet={selectedPlanet} />}

        {/* 5. Center Core (The Solar Hub) */}
        <circle cx={CENTER} cy={CENTER} r={95} fill="url(#core-grad)" />
        <circle cx={CENTER} cy={CENTER} r={3} fill="#fbbf24" filter="url(#glow)" />
        
        {/* Core Astrological cross (Asc/Desc, MC/IC grid guidelines) */}
        <line x1={CENTER - INNER_RADIUS} y1={CENTER} x2={CENTER + INNER_RADIUS} y2={CENTER} stroke="rgba(139, 92, 246, 0.04)" strokeWidth="1" />
        <line x1={CENTER} y1={CENTER - INNER_RADIUS} x2={CENTER} y2={CENTER + INNER_RADIUS} stroke="rgba(139, 92, 246, 0.04)" strokeWidth="1" />

        {/* 6. Glowing Planet Markers */}
        <g id="planet-markers">
          {planets &&
            Object.entries(planets).map(([key, data]) => (
              <PlanetMarker
                key={`marker-${key}`}
                planetKey={key}
                data={data}
                radius={ORBIT_MAPPING[key]}
                centerX={CENTER}
                centerY={CENTER}
                isHighlighted={selectedPlanet === key}
                onClick={() => onSelectPlanet(selectedPlanet === key ? null : key)}
              />
            ))}
        </g>
      </svg>
    </div>
  );
}
