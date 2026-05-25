'use client';

import React from 'react';
import { PlanetsData } from '../hooks/usePlanetPositions';
import { ORBIT_MAPPING } from './ZodiacWheel';

interface AspectLinesProps {
  planets: PlanetsData;
  selectedPlanet: string | null;
}

interface Aspect {
  p1: string;
  p2: string;
  type: 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';
  angleDiff: number;
  label: string;
  color: string;
  dash: string;
  weight: number;
}

const ASPECTS_CONFIG = [
  { type: 'conjunction', target: 0, orb: 8, color: '#fbbf24', label: 'Conjunction (0°)', dash: 'none', weight: 2 },
  { type: 'sextile', target: 60, orb: 6, color: '#10b981', label: 'Sextile (60°)', dash: '4 4', weight: 1.5 },
  { type: 'square', target: 90, orb: 8, color: '#f97316', label: 'Square (90°)', dash: 'none', weight: 2 },
  { type: 'trine', target: 120, orb: 8, color: '#3b82f6', label: 'Trine (120°)', dash: 'none', weight: 2 },
  { type: 'opposition', target: 180, orb: 8, color: '#ef4444', label: 'Opposition (180°)', dash: '6 3', weight: 2 }
];

const CENTER = 450; // Size/2 of ZodiacWheel

export function AspectLines({ planets, selectedPlanet }: AspectLinesProps) {
  // Find all active aspects between the 10 planets
  const activeAspects: Aspect[] = React.useMemo(() => {
    const aspects: Aspect[] = [];
    const keys = Object.keys(planets);

    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const p1 = keys[i];
        const p2 = keys[j];
        
        const lon1 = planets[p1].longitude;
        const lon2 = planets[p2].longitude;

        // Calculate absolute shortest angular distance
        let diff = Math.abs(lon1 - lon2);
        if (diff > 180) diff = 360 - diff;

        // Check if it fits any aspect orb
        for (const config of ASPECTS_CONFIG) {
          const distanceToTarget = Math.abs(diff - config.target);
          if (distanceToTarget <= config.orb) {
            aspects.push({
              p1,
              p2,
              type: config.type as any,
              angleDiff: diff,
              label: config.label,
              color: config.color,
              dash: config.dash,
              weight: config.weight
            });
            break; // Max 1 aspect between any pair
          }
        }
      }
    }
    return aspects;
  }, [planets]);

  // Filter aspects based on selection
  // If a planet is highlighted, we ONLY show aspects involving that planet
  const renderedAspects = React.useMemo(() => {
    if (!selectedPlanet) {
      // By default when nothing is selected, we can show all aspects with a subtle opacity,
      // which gives a beautiful, detailed astrological layout.
      return activeAspects;
    }
    return activeAspects.filter(a => a.p1 === selectedPlanet || a.p2 === selectedPlanet);
  }, [activeAspects, selectedPlanet]);

  return (
    <g id="aspect-lines-layer">
      {renderedAspects.map((aspect, idx) => {
        const p1Data = planets[aspect.p1];
        const p2Data = planets[aspect.p2];

        if (!p1Data || !p2Data) return null;

        const r1 = ORBIT_MAPPING[aspect.p1];
        const r2 = ORBIT_MAPPING[aspect.p2];

        // Polar to rectangular coords
        const rad1 = (p1Data.longitude * Math.PI) / 180;
        const rad2 = (p2Data.longitude * Math.PI) / 180;

        const x1 = CENTER + r1 * Math.cos(rad1);
        const y1 = CENTER + r1 * Math.sin(rad1);
        const x2 = CENTER + r2 * Math.cos(rad2);
        const y2 = CENTER + r2 * Math.sin(rad2);

        const isHighlighted = selectedPlanet === aspect.p1 || selectedPlanet === aspect.p2;

        return (
          <g key={`aspect-${aspect.p1}-${aspect.p2}-${idx}`}>
            {/* Ambient shadow glow line */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={aspect.color}
              strokeWidth={aspect.weight + (isHighlighted ? 4 : 2)}
              opacity={isHighlighted ? 0.4 : 0.08}
              strokeDasharray={aspect.dash}
              style={{
                transition: 'all 0.3s ease',
                filter: isHighlighted ? 'blur(3px)' : 'none'
              }}
            />
            {/* Core solid crisp connection line */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={aspect.color}
              strokeWidth={aspect.weight}
              opacity={isHighlighted ? 0.95 : 0.25}
              strokeDasharray={aspect.dash}
              style={{
                transition: 'all 0.3s ease'
              }}
            />
            
            {/* Small glowing nodes at intersections for selection feedback */}
            {isHighlighted && (
              <>
                <circle cx={x1} cy={y1} r="4" fill={aspect.color} opacity="0.8" />
                <circle cx={x2} cy={y2} r="4" fill={aspect.color} opacity="0.8" />
              </>
            )}
          </g>
        );
      })}
    </g>
  );
}
