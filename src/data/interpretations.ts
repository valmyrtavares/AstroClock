/**
 * Placeholder functions for generating astrological interpretations.
 * You can replace the switch/case logic here with a real data structure 
 * or JSON importing in the future.
 */

export function getAspectInterpretation(p1Name: string, p2Name: string, aspectLabel: string): string {
  // Retorna um texto de placeholder para o uso interno.
  // Ex: "A Quadratura entre Sol e Lua..."
  
  const baseText = `Esta é uma interpretação para o aspecto de ${aspectLabel} entre ${p1Name} e ${p2Name}. `;
  
  if (aspectLabel === 'Conjunção') {
    return baseText + `A Conjunção indica uma fusão e intensificação das energias de ambos os astros. Eles agem como uma unidade, o que pode ser extremamente poderoso, mas requer consciência para não se tornar avassalador.`;
  }
  if (aspectLabel === 'Sextil') {
    return baseText + `O Sextil é um aspecto harmonioso que indica oportunidades, fluidez e talentos naturais que podem ser desenvolvidos. As energias colaboram de forma estimulante.`;
  }
  if (aspectLabel === 'Quadratura') {
    return baseText + `A Quadratura é um aspecto dinâmico de tensão. Exige ação, superação de obstáculos e ajustes. É uma fonte de grande energia e crescimento se a frustração for superada.`;
  }
  if (aspectLabel === 'Trígono') {
    return baseText + `O Trígono é o aspecto mais fluente e benéfico, indicando sorte, facilidade e talentos inatos. As energias fluem sem resistência, trazendo apoio mútuo.`;
  }
  if (aspectLabel === 'Oposição') {
    return baseText + `A Oposição traz polaridade e a necessidade de equilíbrio. Muitas vezes projeta-se nos relacionamentos, exigindo integração de energias opostas para evitar conflitos extremos.`;
  }

  return baseText + `Este aspecto marca uma importante interação energética em seu mapa.`;
}

export function getPlanetInSignInterpretation(planetName: string, signName: string): string {
  // Retorna um texto de placeholder explicativo da presença do planeta no signo
  return `A presença de ${planetName} no signo de ${signName} matiza a energia deste astro com as qualidades essenciais de ${signName}. 

(Placeholder) Aqui você pode descrever como a natureza de ${planetName} (ex: comunicação, emoção, ação) se expressa através do filtro de ${signName} (ex: de forma pragmática se for um signo de terra, de forma emocional se for água, de forma explosiva se for fogo, ou intelectual se for ar). Esta combinação específica marca a forma fundamental como este aspecto opera em seu mapa.`;
}
