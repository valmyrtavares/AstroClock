'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar, Clock, MapPin, User, Info } from 'lucide-react';

interface AstralMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: {
    name: string;
    date: Date;
    city: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
  }) => void;
}

export function AstralMapModal({ isOpen, onClose, onGenerate }: AstralMapModalProps) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('Brasil');
  const [error, setError] = useState<string | null>(null);
  const [geocoding, setGeocoding] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!name.trim()) {
      setError('Por favor, informe seu nome.');
      return;
    }
    
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    const hr = parseInt(hour, 10);
    const min = parseInt(minute, 10);
    const sec = second ? parseInt(second, 10) : 0;

    if (isNaN(d) || d < 1 || d > 31) {
      setError('Dia inválido (deve ser entre 1 e 31).');
      return;
    }
    if (isNaN(m) || m < 1 || m > 12) {
      setError('Mês inválido (deve ser entre 1 e 12).');
      return;
    }
    if (isNaN(y) || y < 1800 || y > 2100) {
      setError('Ano inválido (deve ser entre 1800 e 2100).');
      return;
    }
    if (isNaN(hr) || hr < 0 || hr > 23) {
      setError('Hora inválida (deve ser entre 0 e 23).');
      return;
    }
    if (isNaN(min) || min < 0 || min > 59) {
      setError('Minutos inválidos (deve ser entre 0 e 59).');
      return;
    }
    if (second && (isNaN(sec) || sec < 0 || sec > 59)) {
      setError('Segundos inválidos (deve ser entre 0 e 59).');
      return;
    }
    if (!city.trim() || !state.trim() || !country.trim()) {
      setError('Por favor, informe a cidade, estado e país de nascimento.');
      return;
    }

    // Create date (Months are 0-indexed in JS Date)
    const birthDate = new Date(y, m - 1, d, hr, min, sec);
    if (isNaN(birthDate.getTime())) {
      setError('Data de nascimento inválida.');
      return;
    }

    setGeocoding(true);
    const query = `${city.trim()}, ${state.trim()}, ${country.trim()}`;
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'AstroClock/1.0 (Astrological Alignment Clock)'
      }
    })
      .then(res => res.json())
      .then(data => {
        let lat = -23.5505; // Fallback SP
        let lon = -46.6333;
        if (data && data.length > 0) {
          lat = parseFloat(data[0].lat);
          lon = parseFloat(data[0].lon);
        }
        
        onGenerate({
          name: name.trim(),
          date: birthDate,
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          lat,
          lon
        });
        setGeocoding(false);
        onClose();
      })
      .catch(err => {
        console.error('Erro de geocodificação:', err);
        // Fallback gracefully on network error so the pilgrim is never blocked!
        onGenerate({
          name: name.trim(),
          date: birthDate,
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          lat: -23.5505,
          lon: -46.6333
        });
        setGeocoding(false);
        onClose();
      });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-lg glass-panel rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-purple-500/25 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div 
            className="px-6 py-5 flex items-center justify-between border-b border-purple-500/10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.04))'
            }}
          >
            <div className="flex items-center space-x-3.5 z-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-purple-100">
                  Faça o seu Mapa Astral
                </h3>
                <p className="text-xs text-purple-400">
                  Calcule o alinhamento cósmico do seu nascimento
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-purple-500/10 hover:bg-red-500/15 text-purple-300 hover:text-red-400 border border-purple-500/10 hover:border-red-500/20 flex items-center justify-center transition-all duration-200"
            >
              <X size={15} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin">
            {error && (
              <div className="p-3.5 rounded-xl border border-red-500/25 bg-red-950/20 text-red-400 text-xs flex items-center gap-2">
                <Info size={14} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Pilgrim Name */}
            <div className="space-y-2">
              <label className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <User size={13} className="text-purple-400" />
                Nome do Peregrino
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Valmyr Tavares"
                className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 hover:border-purple-500/20 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm focus:outline-none transition-all"
                required
              />
            </div>

            {/* Birth Date (Day / Month / Year) */}
            <div className="space-y-2">
              <label className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={13} className="text-purple-400" />
                Data de Nascimento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="Dia"
                  min="1"
                  max="31"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                  required
                />
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Mês"
                  min="1"
                  max="12"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                  required
                />
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Ano"
                  min="1800"
                  max="2100"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Birth Time (Hour / Minute / Second) */}
            <div className="space-y-2">
              <label className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={13} className="text-purple-400" />
                Horário do Nascimento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="Hora"
                  min="0"
                  max="23"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                  required
                />
                <input
                  type="number"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="Minutos"
                  min="0"
                  max="59"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                  required
                />
                <input
                  type="number"
                  value={second}
                  onChange={(e) => setSecond(e.target.value)}
                  placeholder="Seg (Opcional)"
                  min="0"
                  max="59"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm text-center focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Birth Location */}
            <div className="space-y-2">
              <label className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={13} className="text-purple-400" />
                Local de Nascimento
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Cidade"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm focus:outline-none transition-all col-span-1"
                  required
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Estado"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm focus:outline-none transition-all col-span-1"
                  required
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="País"
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/20 border border-purple-500/10 focus:border-purple-500/40 text-purple-100 placeholder-purple-500/50 text-sm focus:outline-none transition-all col-span-1"
                  required
                />
              </div>
            </div>

            {/* Submit & Close Buttons */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-purple-500/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 border border-purple-500/10 transition-all text-xs font-semibold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={geocoding}
                className="px-5 py-2.5 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 border border-purple-400/30 hover:border-pink-300/50 shadow-lg shadow-purple-500/20 text-xs uppercase tracking-wide flex items-center gap-1.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {geocoding ? (
                  <>
                    <div className="w-3.5 h-3.5 rounded-full border border-t-transparent border-white animate-spin shrink-0" />
                    <span>Calculando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={13} />
                    <span>Gerar Mapa Astral</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
