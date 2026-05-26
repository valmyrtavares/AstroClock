'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlanetData } from '../hooks/usePlanetPositions';

interface PlanetMarkerProps {
  planetKey: string;
  data: PlanetData;
  radius: number;
  centerX: number;
  centerY: number;
  isHighlighted: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PLANET_STYLE_MAPPING: Record<
  string,
  { symbol: string; color: string; glow: string; desc: string }
> = {
  sun: { symbol: '☉', color: '#fbbf24', glow: 'rgba(251, 191, 36, 0.45)', desc: 'Ego, Core Identity & Vitality' },
  moon: { symbol: '☽', color: '#f3eff9', glow: 'rgba(243, 239, 249, 0.45)', desc: 'Emotions, Instincts & Subconscious' },
  mercury: { symbol: '☿', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.45)', desc: 'Communication, Intellect & Logic' },
  venus: { symbol: '♀', color: '#f472b6', glow: 'rgba(244, 114, 182, 0.45)', desc: 'Love, Beauty, Art & Harmony' },
  mars: { symbol: '♂', color: '#f87171', glow: 'rgba(248, 113, 113, 0.45)', desc: 'Action, Desire, Drive & Courage' },
  jupiter: { symbol: '♃', color: '#fb923c', glow: 'rgba(251, 146, 60, 0.45)', desc: 'Luck, Wisdom, Growth & Abundance' },
  saturn: { symbol: '♄', color: '#cbd5e1', glow: 'rgba(203, 213, 225, 0.45)', desc: 'Structure, Discipline & Karma' },
  uranus: { symbol: '♅', color: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.45)', desc: 'Innovation, Rebellion & Sudden Change' },
  neptune: { symbol: '♆', color: '#818cf8', glow: 'rgba(129, 140, 248, 0.45)', desc: 'Dreams, Intuition, Illusion & Mysticism' },
  pluto: { symbol: '♇', color: '#c084fc', glow: 'rgba(192, 132, 252, 0.45)', desc: 'Transformation, Power & Rebirth' }
};

export function PlanetMarker({
  planetKey,
  data,
  radius,
  centerX,
  centerY,
  isHighlighted,
  onClick,
  onMouseEnter,
  onMouseLeave
}: PlanetMarkerProps) {
  const style = PLANET_STYLE_MAPPING[planetKey] || {
    symbol: '?',
    color: '#ffffff',
    glow: 'rgba(255, 255, 255, 0.2)',
    desc: 'Celestial Body'
  };

  // Convert longitude (0 - 360) to polar coordinates
  const rad = (data.longitude * Math.PI) / 180;
  const x = radius * Math.cos(rad);
  const y = radius * Math.sin(rad);

  return (
    <motion.g
      animate={{ x: centerX + x, y: centerY + y }}
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 18,
        mass: 1.1
      }}
      className="cursor-pointer origin-center"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      id={`marker-g-${planetKey}`}
    >
      {/* Planet Astrological Glyph Symbol */}
      <motion.text
        animate={{ scale: isHighlighted ? 1.25 : 1 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15
        }}
        x="0"
        y="10"
        textAnchor="middle"
        fontSize="32"
        fontWeight="bold"
        fill={isHighlighted ? '#ec4899' : style.color}
        className="select-none transition-colors duration-300"
        style={{
          fontFamily: 'sans-serif',
          filter: isHighlighted
            ? `drop-shadow(0 0 8px ${style.color}) drop-shadow(0 0 15px ${style.color})`
            : `drop-shadow(0 0 3px ${style.color})`,
        }}
      >
        {style.symbol}
      </motion.text>

      {/* Small Retrograde Flag (R_x) rendered slightly offset */}
      {data.retrograde && (
        <g transform="translate(18, -18)">
          <circle r="7" fill="#f97316" />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontSize="9"
            fontWeight="bold"
            fill="#ffffff"
            style={{ fontFamily: 'sans-serif', userSelect: 'none' }}
          >
            ℞
          </text>
        </g>
      )}
    </motion.g>
  );
}
