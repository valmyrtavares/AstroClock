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
    description: `Áries é o primeiro signo do zodíaco e representa iniciativa, coragem e impulso. Os arianos costumam ser pessoas diretas, intensas e cheias de energia. Gostam de liderar, começar projetos e enfrentar desafios sem medo. Possuem espírito competitivo e muita determinação para conquistar seus objetivos. Como signo de fogo cardinal, têm tendência à ação rápida e pouca paciência para esperar resultados.
Entre as características positivas estão a coragem, sinceridade, entusiasmo e capacidade de motivar os outros. Já os pontos negativos incluem impulsividade, agressividade, teimosia e dificuldade em lidar com frustrações. O ariano valoriza liberdade, independência e movimento constante. Quando equilibrado, torna-se um líder inspirador e extremamente protetor com quem ama.`
  },
  Taurus: {
    id: 'taurus',
    name: 'Touro',
    element: 'Terra',
    quality: 'Fixo',
    ruler: 'Vênus',
    description: `Touro é um signo ligado à estabilidade, segurança e prazer material. Os taurinos costumam ser pacientes, persistentes e muito ligados ao conforto, à beleza e à vida prática. Como signo de terra fixo, valorizam estabilidade emocional e financeira, buscando construir tudo de forma sólida e duradoura. Gostam de rotina, segurança e relações confiáveis.
Entre suas qualidades estão lealdade, resistência, calma e dedicação. Já os defeitos mais comuns são teimosia, possessividade, acomodação e dificuldade em aceitar mudanças. Taurinos apreciam boa comida, conforto e ambientes agradáveis. São pessoas confiáveis e muito presentes na vida daqueles que amam. Quando desequilibrados, podem se tornar excessivamente controladores ou materialistas.`
  },
  Gemini: {
    id: 'gemini',
    name: 'Gêmeos',
    element: 'Ar',
    quality: 'Mutável',
    ruler: 'Mercúrio',
    description: `Gêmeos representa comunicação, inteligência e versatilidade. Geminianos possuem mente rápida, curiosidade intensa e enorme facilidade para aprender e conversar sobre diversos assuntos. Como signo de ar mutável, adaptam-se facilmente às situações e gostam de mudanças constantes. São sociáveis, criativos e normalmente possuem muitos interesses ao mesmo tempo.
As qualidades incluem inteligência, bom humor, criatividade e capacidade de comunicação. Os defeitos podem ser instabilidade, superficialidade, ansiedade e dificuldade de manter foco por muito tempo. Gostam de novidades, movimento e estímulo mental constante. O geminiano costuma fugir da monotonia e busca liberdade intelectual. Quando equilibrado, torna-se extremamente criativo, divertido e inspirador nas relações.`
  },
  Cancer: {
    id: 'cancer',
    name: 'Câncer',
    element: 'Água',
    quality: 'Cardeal',
    ruler: 'Lua',
    description: `Câncer é o signo da emoção, da família e da sensibilidade. Cancerianos costumam ser intuitivos, acolhedores e profundamente ligados às pessoas que amam. Como signo de água cardinal, possuem emoções intensas e forte necessidade de criar vínculos emocionais seguros. São protetores, carinhosos e valorizam muito o lar e a família.
Entre suas qualidades estão empatia, lealdade, sensibilidade e cuidado com os outros. Já os defeitos incluem carência, insegurança, dramatização e dificuldade em superar mágoas. O canceriano costuma guardar memórias e sentimentos por muito tempo. Possui forte intuição e costuma perceber emoções escondidas das pessoas. Quando equilibrado, torna-se extremamente amoroso, protetor e emocionalmente sábio.`
  },
  Leo: {
    id: 'leo',
    name: 'Leão',
    element: 'Fogo',
    quality: 'Fixo',
    ruler: 'Sol',
    description: `Leão simboliza brilho pessoal, autoestima e criatividade. Leoninos costumam ser confiantes, calorosos e naturalmente chamativos. Gostam de reconhecimento e possuem forte necessidade de expressar sua individualidade. Como signo de fogo fixo, têm presença marcante, grande força de vontade e personalidade intensa.
As qualidades incluem generosidade, liderança, coragem e lealdade. Os defeitos podem ser orgulho, vaidade, autoritarismo e necessidade excessiva de atenção. O leonino gosta de ser admirado e tende a proteger as pessoas que ama com intensidade. São criativos e normalmente têm talento para inspirar os outros. Quando equilibrados, tornam-se líderes carismáticos, positivos e extremamente motivadores.`
  },
  Virgo: {
    id: 'virgo',
    name: 'Virgem',
    element: 'Terra',
    quality: 'Mutável',
    ruler: 'Mercúrio',
    description: `Virgem representa organização, análise e aperfeiçoamento. Virginianos são observadores, detalhistas e possuem grande capacidade lógica. Como signo de terra mutável, unem praticidade com adaptação, buscando constantemente melhorar tudo ao redor. Gostam de eficiência, planejamento e ambientes organizados.
Entre suas qualidades estão inteligência analítica, responsabilidade, dedicação e disciplina. Já os defeitos incluem perfeccionismo excessivo, críticas constantes, ansiedade e dificuldade para relaxar. O virginiano presta atenção em detalhes que passam despercebidos para outras pessoas. Costuma demonstrar amor através do cuidado e da ajuda prática. Quando equilibrado, torna-se extremamente competente, confiável e útil para todos ao redor.`
  },
  Libra: {
    id: 'libra',
    name: 'Libra',
    element: 'Ar',
    quality: 'Cardeal',
    ruler: 'Vênus',
    description: `Libra é o signo da harmonia, dos relacionamentos e da diplomacia. Librianos valorizam equilíbrio, beleza e convivência pacífica. Como signo de ar cardinal, possuem habilidade social, charme natural e facilidade para mediar conflitos. Gostam de justiça, elegância e ambientes harmoniosos.
As qualidades incluem simpatia, diplomacia, gentileza e senso estético refinado. Os defeitos mais comuns são indecisão, necessidade excessiva de agradar, superficialidade e dificuldade em enfrentar conflitos diretamente. O libriano normalmente evita brigas e busca consenso em tudo. Possui forte talento para relações sociais e parcerias. Quando equilibrado, torna-se extremamente justo, elegante e inspirador nas relações humanas.`
  },
  Scorpio: {
    id: 'scorpio',
    name: 'Escorpião',
    element: 'Água',
    quality: 'Fixo',
    ruler: 'Plutão / Marte',
    description: `Escorpião representa intensidade, transformação e profundidade emocional. Escorpianos são misteriosos, intuitivos e emocionalmente intensos. Como signo de água fixo, vivem sentimentos profundos e possuem enorme força emocional. Gostam de descobrir verdades ocultas e dificilmente fazem algo pela metade.
Entre as qualidades estão determinação, lealdade, coragem emocional e poder de transformação. Os defeitos incluem ciúmes, obsessão, desconfiança e tendência ao controle. Escorpianos costumam ser reservados e observadores, protegendo muito sua intimidade. Possuem magnetismo forte e personalidade marcante. Quando equilibrados, tornam-se pessoas extremamente profundas, poderosas emocionalmente e capazes de grande renovação pessoal.`
  },
  Sagittarius: {
    id: 'sagittarius',
    name: 'Sagitário',
    element: 'Fogo',
    quality: 'Mutável',
    ruler: 'Júpiter',
    description: `Sagitário simboliza expansão, aventura e busca por conhecimento. Sagitarianos costumam ser otimistas, espontâneos e apaixonados por liberdade. Como signo de fogo mutável, possuem energia aventureira e enorme curiosidade sobre o mundo. Gostam de viagens, aprendizado e novas experiências.
As qualidades incluem entusiasmo, sinceridade, generosidade e visão positiva da vida. Já os defeitos podem ser exagero, impulsividade, impaciência e sinceridade excessiva. O sagitariano odeia sentir-se preso ou limitado. Está sempre buscando crescimento pessoal e novas descobertas. Quando equilibrado, torna-se extremamente inspirador, divertido e cheio de sabedoria sobre a vida.`
  },
  Capricorn: {
    id: 'capricorn',
    name: 'Capricórnio',
    element: 'Terra',
    quality: 'Cardeal',
    ruler: 'Saturno',
    description: `Capricórnio representa responsabilidade, ambição e construção sólida. Capricornianos são disciplinados, focados e determinados a alcançar objetivos importantes. Como signo de terra cardinal, possuem grande capacidade de liderança prática e vision de longo prazo. Valorizam estabilidade, reconhecimento e resultados concretos.
Entre suas qualidades estão maturidade, persistência, responsabilidade e autocontrole. Já os defeitos incluem rigidez, frieza emocional, pessimismo e excesso de cobrança. O capricorniano costuma levar a vida muito a sério e trabalha duro para conquistar segurança. São pessoas confiáveis e resistentes diante das dificuldades. Quando equilibrados, tornam-se líderes sábios, estáveis e extremamente competentes.`
  },
  Aquarius: {
    id: 'aquarius',
    name: 'Aquário',
    element: 'Ar',
    quality: 'Fixo',
    ruler: 'Urano / Saturno',
    description: `Aquário é o signo da inovação, liberdade e visão de futuro. Aquarianos costumam ser independentes, criativos e diferentes da maioria. Como signo de ar fixo, possuem ideias firmes e pensamento voltado para mudanças sociais e inovação. Gostam de liberdade, originalidade e independência intelectual.
As qualidades incluem criatividade, inteligência, visão futurista e espírito humanitário. Os defeitos podem ser frieza emocional, rebeldia, teimosia e comportamento imprevisível. O aquariano costuma questionar padrões e pensar fora da caixa. Valoriza amizades e causas coletivas. Quando equilibrado, torna-se extremamente inovador, inspirador e capaz de promover grandes mudanças positivas.`
  },
  Pisces: {
    id: 'pisces',
    name: 'Peixes',
    element: 'Água',
    quality: 'Mutável',
    ruler: 'Netuno / Júpiter',
    description: `Peixes representa sensibilidade, imaginação e espiritualidade. Piscianos costumam ser empáticos, intuitivos e profundamente emocionais. Como signo de água mutável, absorvem facilmente emoções e ambientes ao redor. Possuem imaginação fértil e forte conexão com arte, sonhos e espiritualidade.
Entre suas qualidades estão compaixão, criatividade, sensibilidade e capacidade de compreensão emocional. Já os defeitos incluem escapismo, confusão emocional, ingenuidade e dificuldade em impor limites. O pisciano tende a sentir intensamente o sofrimento dos outros. Muitas vezes vive entre fantasia e realidade. Quando equilibrado, torna-se extremamente amoroso, artístico e espiritualmente conectado.`
  }
};
