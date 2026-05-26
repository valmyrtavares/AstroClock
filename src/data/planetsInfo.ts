export interface PlanetInfo {
  id: string;
  name: string;
  ruler: string;
  diameter?: string;
  orbitFromEarth?: string;
  orbitFromSun?: string;
  period: string;
  description: string;
}

export const PLANETS_INFO: Record<string, PlanetInfo> = {
  sun: {
    id: 'sun',
    name: 'Sol',
    ruler: 'Leão',
    diameter: '1.390.000 km',
    orbitFromEarth: '149.600.000 km',
    period: '365,25 Dias',
    description: 'O Sol fala sobre o núcleo real de uma pessoa, o eu interior, sobre aquilo que é de preocupação central. Ele também nos mostra a vitalidade geral e a capacidade de se afirmar, descreve um tom geral de ser que colore tudo o mais.'
  },
  moon: {
    id: 'moon',
    name: 'Lua',
    ruler: 'Câncer',
    orbitFromEarth: '384.000 km',
    period: '27,32 Dias',
    description: 'A Lua representa nossos sentimentos e emoções, a receptividade, imaginação e o tom básico dos sentimentos de uma pessoa. Ela também tem um efeito sobre o senso de ritmo, tempo e timing, influencia nossa adaptabilidade a mudanças, nossa mobilidade e versatilidade.'
  },
  mercury: {
    id: 'mercury',
    name: 'Mercúrio',
    ruler: 'Gêmeos e Virgem',
    orbitFromSun: '57.910.000 km',
    period: '88 Dias',
    description: 'Mercúrio representa a razão, o bom senso, aquilo que é racional. Significa a palavra falada e escrita, colocar em ordem, pesar e avaliar, o processo de aprendizado e habilidades.'
  },
  venus: {
    id: 'venus',
    name: 'Vênus',
    ruler: 'Libra e Touro',
    orbitFromSun: '108.200.000 km',
    period: '225 Dias',
    description: 'Vênus nos dá o senso de beleza, o gozo do prazer, a consciência estética, o amor à harmonia, a sociabilidade, o prazer nos relacionamentos e o erotismo.'
  },
  mars: {
    id: 'mars',
    name: 'Marte',
    ruler: 'Áries',
    orbitFromSun: '227.940.000 km',
    period: '1,9 Anos',
    description: 'Marte representa a energia e o impulso de uma pessoa, sua coragem, determinação, a liberdade de impulso espontâneo. Também descreve a prontidão para a ação, a forma como se faz as coisas, bem como a simples agressão.'
  },
  jupiter: {
    id: 'jupiter',
    name: 'Júpiter',
    ruler: 'Sagitário',
    orbitFromSun: '778.330.000 km',
    period: '11,9 Anos',
    description: 'A busca pelo significado e propósito individual, o otimismo, a esperança e o senso de justiça são representados por Júpiter. Assim também a fé, uma filosofia básica de vida, a busca pelo crescimento espiritual e expansão.'
  },
  saturn: {
    id: 'saturn',
    name: 'Saturno',
    ruler: 'Capricórnio',
    orbitFromSun: '1.429.400.000 km',
    period: '29,5 Anos',
    description: 'Saturno mostra como vivenciamos a "realidade", onde encontramos resistência e descobrimos nossas limitações. Ele representa a consciência e a convicção moral, as leis e regras que escolhemos obedecer. Também nos fala sobre nosso poder de resistência e a capacidade de nos concentrarmos, concede qualidades como seriedade, cautela e reserva.'
  },
  uranus: {
    id: 'uranus',
    name: 'Urano',
    ruler: 'Aquário',
    orbitFromSun: '2.870.990.000 km',
    period: '84 Anos',
    description: 'Urano representa a intuição, transmite inspiração repentina e percepções relâmpago. Uma abertura para tudo o que é novo, desconhecido e incomum. Uma espécie de contrariedade obstinada também está associada a este planeta. Diz-se que é característico da própria astrologia.'
  },
  neptune: {
    id: 'neptune',
    name: 'Netuno',
    ruler: 'Peixes',
    orbitFromSun: '4.504.300.000 km',
    period: '165 Anos',
    description: 'Este planeta nos dá o supersensorial, abre portas para a experiência mística e o transcendental. Neste nível é difícil discernir onde a percepção se transforma em decepção, ilusão e falsas aparências, e por isso Netuno está associado a tudo isso, a drogas e a todos os tipos de pseudorealidades.'
  },
  pluto: {
    id: 'pluto',
    name: 'Plutão',
    ruler: 'Escorpião',
    orbitFromSun: '5.913.520.000 km',
    period: '248 Anos',
    description: 'Plutão descreve como lidamos com o poder, pessoal e não-pessoal, seja através de sofrer o poder dos outros ou de exercê-lo nós mesmos. Descreve como encontramos o demoníaco e mágico, nossos poderes regenerativos e nossa capacidade de mudança radical e renascimento: os ciclos de morrer e se tornar.'
  }
};
