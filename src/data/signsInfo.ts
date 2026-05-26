export interface SignInfo {
  id: string;
  name: string;
  element: string;
  quality: string;
  ruler: string;
  description: string;
}

export const SIGNS_INFO: Record<string, SignInfo> = {
  Aries: {
    id: 'aries',
    name: 'Áries',
    element: 'Fogo',
    quality: 'Cardeal',
    ruler: 'Marte',
    description: 'Áries é o pioneiro do zodíaco. Representa o impulso inicial, a coragem, a iniciativa e a ação direta. Energético e destemido, muitas vezes age antes de pensar.'
  },
  Taurus: {
    id: 'taurus',
    name: 'Touro',
    element: 'Terra',
    quality: 'Fixo',
    ruler: 'Vênus',
    description: 'Touro valoriza a estabilidade, o conforto e a segurança material. É paciente, confiável e possui uma forte conexão com os prazeres dos sentidos e com a natureza.'
  },
  Gemini: {
    id: 'gemini',
    name: 'Gêmeos',
    element: 'Ar',
    quality: 'Mutável',
    ruler: 'Mercúrio',
    description: 'Gêmeos é o comunicador e intelectual. Curioso, adaptável e sempre em busca de conhecimento e troca de ideias. Tende a ser versátil e, por vezes, disperso.'
  },
  Cancer: {
    id: 'cancer',
    name: 'Câncer',
    element: 'Água',
    quality: 'Cardeal',
    ruler: 'Lua',
    description: 'Câncer é o protetor do zodíaco, profundamente conectado às emoções, à família e ao lar. Intuitivo, sensível e empático, busca segurança emocional e familiar.'
  },
  Leo: {
    id: 'leo',
    name: 'Leão',
    element: 'Fogo',
    quality: 'Fixo',
    ruler: 'Sol',
    description: 'Leão brilha com criatividade e autoconfiança. Representa o ego, a liderança, o calor e a vitalidade. Generoso e leal, adora estar no centro das atenções.'
  },
  Virgo: {
    id: 'virgo',
    name: 'Virgem',
    element: 'Terra',
    quality: 'Mutável',
    ruler: 'Mercúrio',
    description: 'Virgem busca a perfeição, a ordem e o serviço aos outros. Analítico, prático e detalhista, tem uma capacidade inata de organizar e melhorar as coisas.'
  },
  Libra: {
    id: 'libra',
    name: 'Libra',
    element: 'Ar',
    quality: 'Cardeal',
    ruler: 'Vênus',
    description: 'Libra é o signo das parcerias, da harmonia e da estética. Busca constantemente o equilíbrio e a justiça em suas relações. Evita conflitos e aprecia a beleza.'
  },
  Scorpio: {
    id: 'scorpio',
    name: 'Escorpião',
    element: 'Água',
    quality: 'Fixo',
    ruler: 'Plutão / Marte',
    description: 'Escorpião é intenso, magnético e profundo. Lida com os mistérios da vida, a transformação, o poder e a regeneração. Tem uma vontade forte e perspicácia investigativa.'
  },
  Sagittarius: {
    id: 'sagittarius',
    name: 'Sagitário',
    element: 'Fogo',
    quality: 'Mutável',
    ruler: 'Júpiter',
    description: 'Sagitário é o buscador da verdade e o viajante. Otimista, aventureiro e filosófico, anseia pela expansão dos horizontes mentais, espirituais e físicos.'
  },
  Capricorn: {
    id: 'capricorn',
    name: 'Capricórnio',
    element: 'Terra',
    quality: 'Cardeal',
    ruler: 'Saturno',
    description: 'Capricórnio representa a estrutura, a disciplina e a ambição. Orientado para os objetivos e paciente, constrói lentamente o seu sucesso com base no trabalho árduo.'
  },
  Aquarius: {
    id: 'aquarius',
    name: 'Aquário',
    element: 'Ar',
    quality: 'Fixo',
    ruler: 'Urano / Saturno',
    description: 'Aquário é o visionário e o rebelde do zodíaco. Focado no coletivo, na inovação e na liberdade. Original, humanitário e muitas vezes imprevisível ou excêntrico.'
  },
  Pisces: {
    id: 'pisces',
    name: 'Peixes',
    element: 'Água',
    quality: 'Mutável',
    ruler: 'Netuno / Júpiter',
    description: 'Peixes é sonhador, místico e altamente empático. Conectado ao plano espiritual e às emoções universais, possui grande sensibilidade artística, mas pode tender à ilusão.'
  }
};
