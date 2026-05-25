'use client';

import React from 'react';
import { Play, Pause, RotateCcw, Calendar, Zap } from 'lucide-react';

interface TimeControlsProps {
  date: Date;
  setDate: (date: Date) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  simulationSpeed: number;
  setSimulationSpeed: (speed: number) => void;
}

const SPEED_OPTIONS = [
  { value: 1, label: 'Live' },
  { value: 3600, label: '1 Hr/s' },
  { value: 86400, label: '1 Day/s' },
  { value: 604800, label: '1 Wk/s' },
  { value: 2592000, label: '30 Days/s' }
];

export function TimeControls({
  date,
  setDate,
  isPlaying,
  setIsPlaying,
  simulationSpeed,
  setSimulationSpeed
}: TimeControlsProps) {
  
  // Format simulation date for standard datetime-local inputs
  // Needs to be YYYY-MM-DDTHH:MM:SS
  const formatInputDateTime = (d: Date) => {
    const pad = (num: number) => String(num).padStart(2, '0');
    // Account for timezone offset
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDate(new Date(e.target.value));
    }
  };

  const handleSyncNow = () => {
    setDate(new Date());
    setIsPlaying(true);
    setSimulationSpeed(1);
  };

  // Format date for the glowing digital display
  const formatDigitalDate = (d: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return d.toLocaleDateString(undefined, options);
  };

  const formatDigitalTime = (d: Date) => {
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between md:space-x-6">
      
      {/* 1. Glowing Digital Clock Display */}
      <div className="flex flex-col space-y-1 md:w-1/3">
        <span className="text-[10px] text-purple-400 font-semibold uppercase tracking-widest flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          Simulation Time
        </span>
        <div className="flex flex-col">
          <span className="text-2xl font-bold font-outfit tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-300 to-pink-200 glow-text-purple">
            {formatDigitalTime(date)}
          </span>
          <span className="text-xs text-purple-300 font-medium tracking-wide">
            {formatDigitalDate(date)}
          </span>
        </div>
      </div>

      {/* 2. Cockpit Controls: Play/Pause, Speed slider */}
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:items-center md:space-x-6 md:w-2/3">
        {/* Playback Buttons */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
              isPlaying
                ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40 hover:bg-purple-500/35 hover:text-white'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border border-transparent shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-105'
            }`}
            title={isPlaying ? 'Pause Simulation' : 'Start Simulation'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          </button>
          
          <button
            onClick={handleSyncNow}
            className="w-11 h-11 rounded-xl bg-purple-950/20 text-purple-300 border border-purple-950/40 flex items-center justify-center hover:bg-purple-500/15 hover:text-purple-200 hover:border-purple-500/30 transition-all duration-300"
            title="Sync with Real-time Now"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* Speed Warp Toggles */}
        <div className="flex flex-col space-y-1 flex-1">
          <span className="text-[9px] text-purple-400 uppercase tracking-widest font-semibold flex items-center gap-1">
            <Zap size={10} className="text-pink-400" />
            Orbit Speed Multiplier
          </span>
          <div className="grid grid-cols-5 gap-1.5 p-1 bg-purple-950/25 border border-purple-500/10 rounded-xl">
            {SPEED_OPTIONS.map((opt) => {
              const active = simulationSpeed === opt.value;
              return (
                <button
                  key={`speed-${opt.value}`}
                  onClick={() => {
                    setSimulationSpeed(opt.value);
                    if (!isPlaying) setIsPlaying(true); // Auto-resume on speed change
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-semibold tracking-wide transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-purple-100 border border-purple-500/30 shadow-sm'
                      : 'text-purple-400 hover:text-purple-200 hover:bg-purple-500/5 border border-transparent'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Selector input */}
        <div className="flex flex-col space-y-1 relative">
          <span className="text-[9px] text-purple-400 uppercase tracking-widest font-semibold flex items-center gap-1">
            <Calendar size={10} className="text-purple-400" />
            Time Travel Coordinates
          </span>
          <input
            type="datetime-local"
            value={formatInputDateTime(date)}
            onChange={handleDateTimeChange}
            className="px-3 py-1.5 rounded-xl bg-purple-950/20 text-purple-200 border border-purple-500/10 text-xs font-mono focus:outline-none focus:border-purple-500/35 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 w-full md:w-auto"
          />
        </div>
      </div>

    </div>
  );
}
