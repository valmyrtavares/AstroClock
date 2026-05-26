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
    description: `Representa: identidade, ego, vitalidade, propósito pessoal e brilho individual.

O Sol simboliza a essência da personalidade e aquilo que faz a pessoa se sentir viva. Mostra como alguém deseja ser reconhecido no mundo e qual é sua força interior. Está ligado à autoestima, criatividade e capacidade de liderança. Pessoas com o Sol forte costumam ter presença marcante e confiança natural. Quando desequilibrado, pode gerar arrogância ou necessidade excessiva de aprovação.

Bem aspectado:
• Leão (domicílio)
• Áries (exaltação)

Neutro:
• Sagitário
• Libra
• Gêmeos
• Touro

Mal aspectado:
• Aquário (detrimento)
• Libra (queda tradicional em alguns sistemas)`
  },
  moon: {
    id: 'moon',
    name: 'Lua',
    ruler: 'Câncer',
    orbitFromEarth: '384.000 km',
    period: '27,32 Dias',
    description: `Representa: emoções, instintos, sensibilidade, inconsciente e vida afetiva.

A Lua mostra como a pessoa sente, reage emocionalmente e busca segurança emocional. Está ligada à infância, memória, maternidade e mundo interior. Quem possui Lua forte costuma ser intuitivo, acolhedor e emocionalmente conectado. Quando desequilibrada, pode gerar instabilidade emocional, carência ou excesso de sensibilidade. A Lua também mostra como alguém cuida e deseja ser cuidado.

Bem aspectada:
• Câncer (domicílio)
• Touro (exaltação)

Neutro:
• Peixes
• Libra
• Virgem

Mal aspectada:
• Capricórnio (detrimento)
• Escorpião (queda)`
  },
  mercury: {
    id: 'mercury',
    name: 'Mercúrio',
    ruler: 'Gêmeos e Virgem',
    orbitFromSun: '57.910.000 km',
    period: '88 Dias',
    description: `Representa: comunicação, inteligência, raciocínio, aprendizado e expressão mental.

Mercúrio rege a mente lógica, a linguagem e a forma de pensar. Mostra como alguém aprende, conversa e interpreta informações. Pessoas com Mercúrio forte possuem facilidade de comunicação e adaptação intelectual. Quando mal aspectado, pode gerar ansiedade mental, dispersão ou dificuldade de expressão. Também está relacionado à curiosidade, estudos e troca de ideias.

Bem aspectado:
• Gêmeos (domicílio)
• Virgem (domicílio e exaltação)

Neutro:
• Aquário
• Libra
• Capricórnio

Mal aspectado:
• Sagitário (detrimento)
• Peixes (queda e detrimento)`
  },
  venus: {
    id: 'venus',
    name: 'Vênus',
    ruler: 'Libra e Touro',
    orbitFromSun: '108.200.000 km',
    period: '225 Dias',
    description: `Representa: amor, prazer, relacionamentos, beleza, valores e afetividade.

Vênus simboliza a forma como alguém ama, se relaciona e sente prazer na vida. Também rege estética, arte, sensualidade e harmonia. Pessoas com Vênus forte costumam ser charmosas, afetuosas e sociáveis. Quando mal aspectada, pode trazer dependência emocional, superficialidade ou dificuldade afetiva. Vênus mostra aquilo que atrai e o que faz alguém se sentir valorizado.

Bem aspectada:
• Touro (domicílio)
• Libra (domicílio)
• Peixes (exaltação)

Neutro:
• Câncer
• Aquário
• Sagitário

Mal aspectada:
• Escorpião (detrimento)
• Áries (detrimento)
• Virgem (queda)`
  },
  mars: {
    id: 'mars',
    name: 'Marte',
    ruler: 'Áries',
    orbitFromSun: '227.940.000 km',
    period: '1,9 Anos',
    description: `Representa: ação, coragem, desejo, impulso, força física e sexualidade.

Marte é o planeta da iniciativa e da luta. Mostra como alguém age diante de desafios e como expressa raiva, desejo e competitividade. Pessoas com Marte forte possuem coragem, iniciativa e intensidade. Quando desequilibrado, pode gerar agressividade, impulsividade ou conflitos constantes. Marte também está ligado à energia física e ao instinto de conquista.

Bem aspectado:
• Áries (domicílio)
• Escorpião (domicílio tradicional)
• Capricórnio (exaltação)

Neutro:
• Leão
• Sagitário
• Aquário

Mal aspectado:
• Libra (detrimento)
• Touro (detrimento)
• Câncer (queda)`
  },
  jupiter: {
    id: 'jupiter',
    name: 'Júpiter',
    ruler: 'Sagitário',
    orbitFromSun: '778.330.000 km',
    period: '11,9 Anos',
    description: `Representa: expansão, sorte, sabedoria, crescimento e espiritualidade.

Júpiter simboliza crescimento pessoal, fé e busca por significado. Está ligado ao otimismo, abundância e conhecimento superior. Pessoas com Júpiter forte costumam ser generosas, visionárias e positivas. Quando mal aspectado, pode gerar exageros, arrogância ou falta de limites. Também rege viagens, filosofia e desenvolvimento espiritual.

Bem aspectado:
• Sagitário (domicílio)
• Peixes (domicílio tradicional)
• Câncer (exaltação)

Neutro:
• Leão
• Áries
• Aquário

Mal aspectado:
• Gêmeos (detrimento)
• Virgem (detrimento)
• Capricórnio (queda)`
  },
  saturn: {
    id: 'saturn',
    name: 'Saturno',
    ruler: 'Capricórnio',
    orbitFromSun: '1.429.400.000 km',
    period: '29,5 Anos',
    description: `Representa: disciplina, limites, responsabilidade, maturidade e karma.

Saturno é o planeta da estrutura e das lições da vida. Mostra onde existem desafios, cobranças e necessidade de amadurecimento. Pessoas com Saturno forte tendem a ser responsáveis, persistentes e disciplinadas. Quando mal aspectado, pode trazer medo, rigidez, pessimismo ou excesso de autocobrança. Saturno ensina crescimento através da experiência e da paciência.

Bem aspectado:
• Capricórnio (domicílio)
• Aquário (domicílio tradicional)
• Libra (exaltação)

Neutro:
• Virgem
• Touro
• Escorpião

Mal aspectado:
• Câncer (detrimento)
• Leão (detrimento)
• Áries (queda)`
  },
  uranus: {
    id: 'uranus',
    name: 'Urano',
    ruler: 'Aquário',
    orbitFromSun: '2.870.990.000 km',
    period: '84 Anos',
    description: `Representa: inovação, liberdade, revolução, mudanças e originalidade.

Urano simboliza quebra de padrões, independência e pensamento futurista. Pessoas com Urano forte possuem personalidade diferente, criativa e imprevisível. Está ligado à tecnologia, inovação e transformações repentinas. Quando desequilibrado, pode gerar rebeldia excessiva, instabilidade ou dificuldade de adaptação emocional. É o planeta da liberdade individual e da evolução coletiva.

Bem aspectado:
• Aquário (domicílio)
• Escorpião (exaltação moderna)

Neutro:
• Gêmeos
• Libra
• Sagitário

Mal aspectado:
• Leão (detrimento)
• Touro (queda)`
  },
  neptune: {
    id: 'neptune',
    name: 'Netuno',
    ruler: 'Peixes',
    orbitFromSun: '4.504.300.000 km',
    period: '165 Anos',
    description: `Representa: espiritualidade, sonhos, imaginação, intuição e transcendência.

Netuno rege o mundo invisível, os sonhos e a sensibilidade espiritual. Pessoas com Netuno forte costumam ser intuitivas, criativas e empáticas. Está ligado à arte, inspiração e conexão espiritual profunda. Quando mal aspectado, pode gerar ilusões, escapismo, vícios ou dificuldade de enxergar a realidade com clareza. Netuno dissolve limites e amplia a percepção emocional.

Bem aspectado:
• Peixes (domicílio)
• Câncer (exaltação moderna)

Neutro:
• Escorpião
• Libra
• Aquário

Mal aspectado:
• Virgem (detrimento)
• Capricórnio (queda moderna)`
  },
  pluto: {
    id: 'pluto',
    name: 'Plutão',
    ruler: 'Escorpião',
    orbitFromSun: '5.913.520.000 km',
    period: '248 Anos',
    description: `Representa: transformação, poder, regeneração, intensidade e renascimento.

Plutão simboliza mudanças profundas e processos de morte e renascimento emocional. Pessoas com Plutão forte possuem intensidade emocional, magnetismo e grande poder de transformação pessoal. Está ligado ao inconsciente profundo, controle, sexualidade e superação. Quando desequilibrado, pode gerar obsessão, manipulação ou destrutividade emocional. É o planeta das grandes mudanças internas.

Bem aspectado:
• Escorpião (domicílio)
• Áries (exaltação moderna)

Neutro:
• Capricórnio
• Peixes
• Leão

Mal aspectado:
• Touro (detrimento)
• Libra (queda moderna)`
  }
};
