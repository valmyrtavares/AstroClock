'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface PlanetData {
  name: string;
  longitude: number; // 0 to 360
  sign: string;
  symbol: string;
  speed: number; // degrees per day
  retrograde: boolean;
}

export type PlanetsData = Record<string, PlanetData>;

export interface UsePlanetPositionsReturn {
  planets: PlanetsData | null;
  loading: boolean;
  error: string | null;
  date: Date;
  isPlaying: boolean;
  simulationSpeed: number; // 1 = real-time, other numbers = speed multiplier in seconds per second
  selectedPlanet: string | null;
  setSelectedPlanet: (planetKey: string | null) => void;
  setDate: (date: Date) => void;
  setIsPlaying: (playing: boolean) => void;
  setSimulationSpeed: (speed: number) => void;
  refetch: () => void;
}

export function usePlanetPositions(): UsePlanetPositionsReturn {
  const [date, setDateState] = useState<Date>(new Date());
  const [planets, setPlanets] = useState<PlanetsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1); // default real-time (1s per 1s)
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // Keep date in a ref for interval access without stale closure
  const dateRef = useRef<Date>(date);
  useEffect(() => {
    dateRef.current = date;
  }, [date]);

  // Handle setting a specific date
  const setDate = useCallback((newDate: Date) => {
    setDateState(newDate);
  }, []);

  // Fetch from our internal API
  const fetchPlanets = useCallback(async (targetDate: Date) => {
    try {
      const isoString = targetDate.toISOString();
      const response = await fetch(`/api/planets?date=${encodeURIComponent(isoString)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch planetary positions');
      }
      const data = await response.json();
      setPlanets(data.planets);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching astronomical data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch helper
  const refetch = useCallback(() => {
    setLoading(true);
    fetchPlanets(dateRef.current);
  }, [fetchPlanets]);

  // 1. Fetch on Date changes
  // To avoid rapid fire fetching while scrubbing, we only fetch at most once every 300ms when scrubbing,
  // but for regular ticks, we can fetch on a stable basis.
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If real-time or regular play ticks, we fetch
    // If speed is extremely fast, we throttle the fetches so we don't crash the server
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchPlanets(date);
    }, 150); // Small throttle to group fast-scrubs/ticks

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [date, fetchPlanets]);

  // 2. Playback / Ticking Engine
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const currentSimDate = dateRef.current;
      // In real-time (speed = 1), we add 1000ms. 
      // If fast-forwarding, we add (1000ms * speed)
      const timeIncrementMs = 1000 * simulationSpeed;
      const nextSimDate = new Date(currentSimDate.getTime() + timeIncrementMs);
      setDateState(nextSimDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed]);

  // 3. Regular 60s background synchronization when in stable real-time
  useEffect(() => {
    if (!isPlaying || simulationSpeed !== 1) return;

    const syncInterval = setInterval(() => {
      // Force sync with server date to avoid drift
      const currentRealDate = new Date();
      setDateState(currentRealDate);
      fetchPlanets(currentRealDate);
    }, 60000);

    return () => clearInterval(syncInterval);
  }, [isPlaying, simulationSpeed, fetchPlanets]);

  return {
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
    refetch,
  };
}
