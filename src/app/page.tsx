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
import { formatAstrologicalPosition } from '../components/PlanetSidebar';

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
  { type: 'conjunction', target: 0, orb: 8, label: 'Conjunção' },
  { type: 'sextile', target: 60, orb: 6, label: 'Sextil' },
  { type: 'square', target: 90, orb: 8, label: 'Quadratura' },
  { type: 'trine', target: 120, orb: 8, label: 'Trígono' },
  { type: 'opposition', target: 180, orb: 8, label: 'Oposição' }
];

function calculateAllAspects(planets: Record<string, any>) {
  const aspects = [];
  const keys = Object.keys(planets);
  
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const p1 = keys[i];
      const p2 = keys[j];
      if (!planets[p1] || !planets[p2]) continue;
      
      const lon1 = planets[p1].longitude;
      const lon2 = planets[p2].longitude;

      let diff = Math.abs(lon1 - lon2);
      if (diff > 180) diff = 360 - diff;

      for (const config of ASPECTS_CONFIG) {
        const distanceToTarget = Math.abs(diff - config.target);
        if (distanceToTarget <= config.orb) {
          aspects.push({
            p1: PLANET_TRANSLATIONS[p1] || p1,
            p2: PLANET_TRANSLATIONS[p2] || p2,
            p1Symbol: planets[p1].symbol,
            p2Symbol: planets[p2].symbol,
            label: config.label,
            orb: distanceToTarget
          });
          break;
        }
      }
    }
  }
  return aspects;
}

function calculateAscendant(date: Date, latitude: number, longitude: number): number {
  // Convert date to UTC Julian Date
  const time = date.getTime();
  const jd = (time / 86400000) + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  
  // Greenwich Mean Sidereal Time in degrees
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + T * T * (0.000387933 - T / 38710000);
  gmst = (gmst % 360 + 360) % 360;
  
  // Local Sidereal Time in degrees
  let lst = gmst + longitude;
  lst = (lst % 360 + 360) % 360;
  
  const ramcRad = (lst * Math.PI) / 180;
  const latRad = (latitude * Math.PI) / 180;
  
  // Obliquity of Ecliptic (approx 23.4392911 degrees)
  const obliquity = 23.4392911;
  const obRad = (obliquity * Math.PI) / 180;
  
  const y = Math.cos(ramcRad);
  const x = -Math.sin(ramcRad) * Math.cos(obRad) - Math.tan(latRad) * Math.sin(obRad);
  
  let ascRad = Math.atan2(y, x);
  let ascDeg = (ascRad * 180) / Math.PI;
  return (ascDeg + 360) % 360;
}

function getZodiacSignForDegree(degree: number) {
  const index = Math.floor(degree / 30) % 12;
  const signs = [
    'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
    'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
  ];
  return signs[index];
}

function parseInlineMarkdown(text: string) {
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index} className="font-bold text-pink-400 print:text-black">{part}</strong>;
    }
    const subparts = part.split('*');
    if (subparts.length > 1) {
      return subparts.map((subpart, subidx) => {
        if (subidx % 2 === 1) {
          return <strong key={subidx} className="font-semibold text-purple-300 print:text-gray-900">{subpart}</strong>;
        }
        return subpart;
      });
    }
    return part;
  });
}

function renderFormattedMarkdown(text: string, isPrint: boolean = false) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      const content = trimmed.substring(4);
      return (
        <h4 key={idx} className={`font-bold mt-4 mb-2 text-base ${isPrint ? 'text-gray-900 border-b border-gray-100 pb-1' : 'text-purple-200'}`}>
          {parseInlineMarkdown(content)}
        </h4>
      );
    }
    if (trimmed.startsWith('## ')) {
      const content = trimmed.substring(3);
      return (
        <h3 key={idx} className={`font-bold mt-5 mb-2.5 text-lg ${isPrint ? 'text-gray-950 border-b border-gray-200 pb-1' : 'text-pink-300'}`}>
          {parseInlineMarkdown(content)}
        </h3>
      );
    }
    if (trimmed.startsWith('# ')) {
      const content = trimmed.substring(2);
      return (
        <h2 key={idx} className={`font-bold mt-6 mb-3 text-xl ${isPrint ? 'text-black border-b-2 border-gray-300 pb-1.5' : 'text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200'}`}>
          {parseInlineMarkdown(content)}
        </h2>
      );
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const content = trimmed.substring(2);
      return (
        <ul key={idx} className="list-disc pl-5 my-1.5" style={{ listStyleType: 'disc' }}>
          <li className={`${isPrint ? 'text-gray-800' : 'text-purple-100'} text-[13px] md:text-sm`}>
            {parseInlineMarkdown(content)}
          </li>
        </ul>
      );
    }
    if (trimmed === '') {
      return <div key={idx} className="h-2" />;
    }
    return (
      <p key={idx} className={`${isPrint ? 'text-gray-800' : 'text-purple-100'} text-[13px] md:text-sm my-2 leading-[1.8] text-justify`}>
        {parseInlineMarkdown(line)}
      </p>
    );
  });
}

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
    lat: number;
    lon: number;
  } | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [aiReading, setAiReading] = React.useState<string | null>(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = React.useState({ lat: -23.5505, lon: -46.6333 }); // Default São Paulo

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => console.log('Usando localização padrão (São Paulo)')
      );
    }
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
    setAiReading(null);
    setAiLoading(false);
    setAiError(null);
  }, [setDate, setIsPlaying]);

  const handleRequestAIInterpretation = React.useCallback(async () => {
    if (!astralData || !planets) return;

    setAiLoading(true);
    setAiError(null);
    setAiReading(null);

    try {
      const aspectList = calculateAllAspects(planets)
        .map(a => `• ${a.p1} em ${a.label} com ${a.p2} (Orb: ${a.orb.toFixed(2)}°)`)
        .join('\n');

      const planetList = Object.entries(planets)
        .map(([key, data]) => `• ${PLANET_TRANSLATIONS[key] || data.name}: ${formatAstrologicalPosition(data.longitude, data.symbol)} em ${ZODIAC_TRANSLATIONS[data.sign] || data.sign} (${data.retrograde ? 'Retrógrado' : 'Direto'})`)
        .join('\n');

      const ascDegree = calculateAscendant(date, astralData.lat, astralData.lon);
      const ascSign = getZodiacSignForDegree(ascDegree);

      const response = await fetch('/api/astral-reading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: astralData.name,
          dateStr: `${astralData.date.toLocaleDateString('pt-BR')} às ${astralData.date.toLocaleTimeString('pt-BR')}`,
          city: astralData.city,
          state: astralData.state,
          country: astralData.country,
          planetsList: planetList,
          aspectList: aspectList,
          ascendantSign: ascSign,
          ascendantDegree: ascDegree.toFixed(2)
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Erro ao consultar o oráculo de IA.');
      }

      setAiReading(resData.reading);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Erro de rede ou servidor ao conectar ao oráculo.');
    } finally {
      setAiLoading(false);
    }
  }, [astralData, planets]);

  const handleCopyAIPrompt = React.useCallback(() => {
    if (!astralData || !planets) return;

    const aspectList = calculateAllAspects(planets)
      .map(a => `• ${a.p1} em ${a.label} com ${a.p2} (Orb: ${a.orb.toFixed(2)}°)`)
      .join('\n');

    const planetList = Object.entries(planets)
      .map(([key, data]) => `• ${PLANET_TRANSLATIONS[key] || data.name}: ${formatAstrologicalPosition(data.longitude, data.symbol)} em ${ZODIAC_TRANSLATIONS[data.sign] || data.sign} (${data.retrograde ? 'Retrógrado' : 'Direto'})`)
      .join('\n');

    const promptText = `Aja como um astrólogo profissional e experiente. Vou fornecer os dados detalhados do meu alinhamento cósmico de nascimento (Mapa Astral) calculado com precisão astronômica.

Por favor, faça uma análise profunda, integrada e personalizada do meu Mapa Astral dividida nas seguintes seções:
1. **Introdução Cósmica**: A assinatura de energia do meu nascimento.
2. **Luminares e Essência**: Uma análise aprofundada do meu Sol e da minha Lua (e como eles interagem em termos de ego, essência e necessidades emocionais).
3. **Cálculo do Ascendente**: A partir da minha hora e local exatos de nascimento, calcule e descreva o meu signo Ascendente, explicando como ele molda minha personalidade externa e primeira impressão.
4. **Dinâmica dos Planetas**: Uma leitura detalhada da posição e energia de cada um dos seguintes planetas em seus respectivos signos:
   - Mercúrio (comunicação e intelecto)
   - Vênus (amor, valores e relacionamentos)
   - Marte (ação, energia e assertividade)
   - Júpiter (expansão e caminhos de sorte/sabedoria)
   - Saturno (responsabilidade, desafios e amadurecimento)
   - Urano, Netuno e Plutão (influências transpessoais e geracionais)
5. **Linhas de Diálogo Cósmico (Aspectos Astrológicos)**: Interprete o impacto psicológico e prático de cada uma das seguintes relações e aspectos ativos entre os meus planetas no meu nascimento:
${aspectList || 'Nenhum aspecto significativo ativo.'}

Dados do Nascimento:
- Nome do Peregrino: ${astralData.name}
- Data: ${astralData.date.toLocaleDateString('pt-BR')} às ${astralData.date.toLocaleTimeString('pt-BR')}
- Local de Nascimento: ${astralData.city}, ${astralData.state} - ${astralData.country}

Coordenadas Planetárias Calculadas (Eclíptica Geocêntrica):
${planetList}

Traga insights profundos, empoderadores e práticos voltados ao autoconhecimento, talentos naturais e áreas de superação baseados estritamente nesses dados.`;

    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [astralData, planets]);

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
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-4 py-4 md:py-6 flex flex-col justify-between space-y-4 md:space-y-6 min-h-screen overflow-x-hidden no-print">
      
      {/* We removed the old print header since we now use the full printable layout at the bottom */}

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
                <span className="mx-2 text-purple-500">•</span>
                Ascendente: <strong className="text-pink-400">{getZodiacSignForDegree(calculateAscendant(date, astralData.lat, astralData.lon))} ({calculateAscendant(date, astralData.lat, astralData.lon).toFixed(1)}°)</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end flex-wrap gap-2 sm:gap-0">
            <button
              onClick={handleCopyAIPrompt}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 border border-pink-400/30 text-white transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
            >
              <Sparkles size={13} className={copied ? "animate-bounce text-yellow-300" : "text-white"} />
              <span>{copied ? "Prompt Copiado!" : "Copiar Prompt de IA"}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 border border-purple-400/30 text-white transition-all cursor-pointer shadow-md shrink-0"
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
            ascendant={calculateAscendant(date, astralData ? astralData.lat : currentCoords.lat, astralData ? astralData.lon : currentCoords.lon)}
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

      {/* 2.5 Native AI Oracle Dashboard Card */}
      {astralData && planets && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 bg-gradient-to-br from-purple-950/20 via-pink-950/10 to-purple-950/20 border border-purple-500/20 shadow-xl relative overflow-hidden w-full no-print">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-4 mb-6">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0 animate-pulse">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-outfit text-purple-100 flex items-center gap-2">
                  Oráculo Cósmico de IA
                </h3>
                <p className="text-xs text-purple-400">
                  Leitura interpretativa personalizada do seu alinhamento natal
                </p>
              </div>
            </div>

            {!aiReading && !aiLoading && (
              <button
                onClick={handleRequestAIInterpretation}
                className="px-5 py-2.5 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 border border-purple-400/30 hover:border-pink-300/50 shadow-lg shadow-purple-500/20 text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer self-start sm:self-auto active:scale-95 shrink-0"
              >
                <Sparkles size={14} className="text-white" />
                Consultar Oráculo (Grátis)
              </button>
            )}
          </div>

          {aiLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 border-t-purple-500 animate-spin" />
                <Sparkles className="text-purple-400 w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-200 uppercase tracking-widest animate-pulse">
                  Alinhando Efemérides com o Oráculo...
                </h4>
                <p className="text-xs text-purple-400 max-w-xs mt-1">
                  A IA está decodificando seus luminares, ascendente e aspectos natais.
                </p>
              </div>
            </div>
          )}

          {aiError && (
            <div className="p-5 rounded-xl border border-red-500/25 bg-red-950/20 text-red-400 text-xs text-center space-y-3 max-w-xl mx-auto">
              <p className="leading-relaxed">{aiError}</p>
              <button
                onClick={handleRequestAIInterpretation}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 transition-all font-bold text-xs uppercase tracking-wide cursor-pointer"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {aiReading && (
            <div className="space-y-3.5 text-purple-100 text-[14px] leading-[1.8] text-left bg-purple-950/10 p-6 rounded-2xl border border-purple-500/10 max-h-[500px] overflow-y-auto font-sans scrollbar-thin">
              {renderFormattedMarkdown(aiReading, false)}
            </div>
          )}
        </div>
      )}

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

      {/* 8. Dedicated Print-Only High-Fidelity Layout */}
      {astralData && planets && (
        <div className="print-block flex-col text-black p-8 space-y-8 bg-white min-h-screen w-full">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-6 w-full">
            <h1 className="text-3xl font-extrabold tracking-widest uppercase font-outfit text-black">
              AstroClock
            </h1>
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase mt-1">
              Mapa Astral de Nascimento
            </p>
            <div className="mt-4 px-6 py-3 border border-gray-300 rounded-xl bg-gray-50 max-w-xl mx-auto text-left grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">Peregrino</span>
                <span className="font-bold text-gray-800">{astralData.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">Data e Hora</span>
                <span className="font-bold text-gray-800">
                  {astralData.date.toLocaleDateString('pt-BR')} às {astralData.date.toLocaleTimeString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">Local de Nascimento</span>
                <span className="font-bold text-gray-800">
                  {astralData.city}, {astralData.state} - {astralData.country}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-semibold uppercase block">Ascendente</span>
                <span className="font-bold text-pink-600">
                  {getZodiacSignForDegree(calculateAscendant(date, astralData.lat, astralData.lon))} ({calculateAscendant(date, astralData.lat, astralData.lon).toFixed(1)}°)
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Zodiac Wheel Drawing */}
          <div className="flex flex-col items-center justify-center space-y-4 page-break-after w-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1.5 w-full text-center">
              Desenho do Céu Astral
            </h2>
            <div className="w-[450px] h-[450px] flex items-center justify-center mx-auto print-svg-container">
              <ZodiacWheel
                planets={planets}
                selectedPlanet={null}
                onSelectPlanet={() => {}}
                ascendant={calculateAscendant(date, astralData.lat, astralData.lon)}
              />
            </div>
          </div>

          {/* Section 2: Planets Coordinates Table */}
          <div className="space-y-4 page-break-after w-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1.5 w-full">
              Posições Celestes (Coordenadas Geocêntricas)
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-3 py-1.5 text-left">Astro</th>
                  <th className="border border-gray-300 px-3 py-1.5 text-left">Zodíaco (Longitude)</th>
                  <th className="border border-gray-300 px-3 py-1.5 text-left">Signo</th>
                  <th className="border border-gray-300 px-3 py-1.5 text-right">Velocidade</th>
                  <th className="border border-gray-300 px-3 py-1.5 text-center">Movimento</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(planets).map(([key, data]) => {
                  const translatedName = PLANET_TRANSLATIONS[key] || data.name;
                  const translatedSign = ZODIAC_TRANSLATIONS[data.sign] || data.sign;
                  return (
                    <tr key={key} className="text-gray-800 odd:bg-gray-50/50">
                      <td className="border border-gray-300 px-3 py-1.5 font-bold flex items-center gap-1.5">
                        <span className="text-sm font-sans">{data.symbol}</span>
                        {translatedName}
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 font-mono">
                        {formatAstrologicalPosition(data.longitude, data.symbol)}
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5">
                        {translatedSign}
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 text-right font-mono">
                        {data.speed > 0 ? '+' : ''}{data.speed.toFixed(4)}°/d
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 text-center">
                        {data.retrograde ? (
                          <span className="text-orange-700 font-bold">Retrógrado (℞)</span>
                        ) : (
                          <span className="text-green-700 font-semibold">Direto</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {/* Ascendente Row */}
                {astralData && (
                  <tr className="text-gray-800 bg-pink-50/20 font-semibold">
                    <td className="border border-gray-300 px-3 py-1.5 font-bold flex items-center gap-1.5 text-pink-700">
                      <span className="text-sm font-sans">ASC</span>
                      Ascendente
                    </td>
                    <td className="border border-gray-300 px-3 py-1.5 font-mono text-pink-700">
                      {formatAstrologicalPosition(
                        calculateAscendant(date, astralData.lat, astralData.lon),
                        'ASC'
                      )}
                    </td>
                    <td className="border border-gray-300 px-3 py-1.5 text-pink-700">
                      {getZodiacSignForDegree(calculateAscendant(date, astralData.lat, astralData.lon))}
                    </td>
                    <td className="border border-gray-300 px-3 py-1.5 text-right font-mono text-gray-400">
                      -
                    </td>
                    <td className="border border-gray-300 px-3 py-1.5 text-center text-pink-600 font-semibold">
                      Ponto Cardeal
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Section 3: Astrological Relations (Aspects) */}
          <div className="space-y-4 w-full">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1.5 w-full">
              Aspectos Astrológicos (Relações entre Astros)
            </h2>
            {calculateAllAspects(planets).length === 0 ? (
              <p className="text-xs text-gray-500 italic">
                Nenhum aspecto astrológico ativo no momento do nascimento.
              </p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border border-gray-300 px-3 py-1.5 text-left">Astro 1</th>
                    <th className="border border-gray-300 px-3 py-1.5 text-center">Relação (Aspecto)</th>
                    <th className="border border-gray-300 px-3 py-1.5 text-right">Astro 2</th>
                    <th className="border border-gray-300 px-3 py-1.5 text-center">Orb (Diferença)</th>
                  </tr>
                </thead>
                <tbody>
                  {calculateAllAspects(planets).map((aspect, idx) => (
                    <tr key={idx} className="text-gray-800 odd:bg-gray-50/50">
                      <td className="border border-gray-300 px-3 py-1.5 font-semibold">
                        <span className="text-sm font-sans mr-1">{aspect.p1Symbol}</span>
                        {aspect.p1}
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 text-center font-bold text-purple-700">
                        {aspect.label}
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 font-semibold text-right">
                        {aspect.p2}
                        <span className="text-sm font-sans ml-1">{aspect.p2Symbol}</span>
                      </td>
                      <td className="border border-gray-300 px-3 py-1.5 text-center font-mono">
                        {aspect.orb.toFixed(2)}°
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Section 4: AI Interpretation (For Print/PDF) */}
          {aiReading && (
            <div className="space-y-4 w-full pt-6 border-t border-gray-300 page-break-before">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-1.5 w-full">
                Leitura e Análise do Oráculo de IA
              </h2>
              <div className="text-[13px] text-gray-800 leading-relaxed text-justify bg-gray-50 p-6 rounded-xl border border-gray-200 font-sans">
                {renderFormattedMarkdown(aiReading, true)}
              </div>
            </div>
          )}
        </div>
      )}

    </>
  );
}
