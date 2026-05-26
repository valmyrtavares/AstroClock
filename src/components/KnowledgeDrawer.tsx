'use client';

import React from 'react';
import { X, BookOpen, ChevronDown, Compass, Zap, RotateCcw, Globe2, Sparkles, MapPin } from 'lucide-react';

interface KnowledgeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TopicSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
}

const TOPICS: TopicSection[] = [
  {
    id: 'como-funciona',
    icon: <Compass size={16} className="text-purple-400" />,
    title: 'Como funciona o AstroClock',
    content: `O AstroClock é um visualizador astrológico em tempo real que mostra as posições geocêntricas dos planetas no zodíaco. Utilizando o algoritmo VSOP87 (Variations Séculaires des Orbites Planétaires), calculamos com precisão astronômica onde cada planeta se encontra a cada instante.

A roda zodiacal central exibe os 12 signos e os planetas posicionados em suas longitudes eclípticas reais. As linhas coloridas entre os planetas representam os aspectos astrológicos — relações angulares significativas que astrólogos interpretam como influências energéticas.

Ao clicar em qualquer planeta, você verá seus aspectos ativos naquele momento, com interpretações detalhadas. Os controles de tempo na parte inferior permitem avançar ou retroceder no tempo para explorar configurações celestes passadas ou futuras.

Esta ferramenta oferece, em tempo real, informações que normalmente exigiriam consulta a efemérides ou softwares especializados — tudo gratuitamente e de forma visual.`
  },
  {
    id: 'aspectos',
    icon: <Zap size={16} className="text-pink-400" />,
    title: 'O que são Aspectos Astrológicos',
    content: `Aspectos são ângulos específicos formados entre dois planetas, medidos ao longo da eclíptica. Eles representam relações dinâmicas entre as energias planetárias. Os cinco aspectos principais (ptolemaicos) são:

☌ Conjunção (0°) — Fusão de energias. Os dois planetas agem como uma força unificada, amplificando-se mutuamente. Pode ser harmônica ou tensa dependendo dos planetas envolvidos.

⚹ Sextil (60°) — Aspecto de oportunidade e fluidez. As energias colaboram de forma estimulante, criando talentos que podem ser desenvolvidos com algum esforço consciente.

□ Quadratura (90°) — Tensão e desafio. Exige ação e superação de obstáculos. É uma fonte de grande energia e crescimento pessoal quando a frustração é transformada em motivação.

△ Trígono (120°) — O aspecto mais fluente e benéfico. Indica facilidade natural, talentos inatos e sorte. As energias fluem sem resistência, trazendo apoio mútuo entre os planetas.

☍ Oposição (180°) — Polaridade e busca por equilíbrio. Frequentemente se manifesta nos relacionamentos, exigindo integração de forças opostas para evitar conflitos extremos.

Cada aspecto tem um "orbe" — uma margem de tolerância. No AstroClock, utilizamos orbes tradicionais para garantir precisão nas detecções.`
  },
  {
    id: 'retrogradacao',
    icon: <RotateCcw size={16} className="text-orange-400" />,
    title: 'Retrogradação Planetária',
    content: `Quando dizemos que um planeta está "retrógrado", não significa que ele literalmente se move para trás no espaço. É um fenômeno visual causado pelas diferenças de velocidade orbital entre a Terra e o planeta em questão — semelhante a quando ultrapassamos um carro na estrada e ele parece se mover para trás.

No AstroClock, planetas retrógrados são marcados com o símbolo ℞ e sua velocidade aparece como negativa (ex: -0.542°/d).

Na tradição astrológica, períodos retrógrados são associados a revisão, introspecção e reavaliação das áreas da vida governadas por aquele planeta:

• Mercúrio ℞ — Revisão na comunicação, tecnologia e viagens
• Vênus ℞ — Reavaliação de relacionamentos e valores
• Marte ℞ — Revisão de ações, energia e assertividade
• Júpiter ℞ — Introspecção sobre crescimento e filosofia de vida
• Saturno ℞ — Revisão de estruturas, responsabilidades e limites

Os planetas exteriores (Urano, Netuno, Plutão) ficam retrógrados por vários meses ao ano, sendo suas retrogradações mais sutis e geracionais.`
  },
  {
    id: 'planetas',
    icon: <Globe2 size={16} className="text-blue-400" />,
    title: 'Os Planetas na Astrologia',
    content: `Cada planeta representa uma função psicológica e uma área da experiência humana:

☉ Sol — A essência, o ego, a vitalidade e o propósito de vida. Representa quem você é no seu núcleo mais fundamental.

☽ Lua — As emoções, o inconsciente, os instintos e as necessidades emocionais. Governa a forma como reagimos e nos sentimos seguros.

☿ Mercúrio — A mente racional, a comunicação, o aprendizado e as viagens curtas. Como pensamos e nos expressamos.

♀ Vênus — O amor, a beleza, os valores, o dinheiro e os prazeres. O que nos atrai e como nos relacionamos.

♂ Marte — A ação, a energia, a assertividade, o desejo e a coragem. Como lutamos pelo que queremos.

♃ Júpiter — A expansão, a sorte, a sabedoria, a filosofia e as viagens. Onde encontramos significado e abundância.

♄ Saturno — A estrutura, os limites, a responsabilidade, a disciplina e o tempo. Onde enfrentamos nossos maiores desafios e amadurecemos.

♅ Urano — A revolução, a originalidade, a liberdade e o inesperado. Onde quebramos padrões.

♆ Netuno — A espiritualidade, a intuição, os sonhos e as ilusões. Onde buscamos transcendência.

♇ Plutão — A transformação profunda, o poder, a morte e o renascimento. Onde enfrentamos nossos medos mais profundos.`
  },
  {
    id: 'signos',
    icon: <Sparkles size={16} className="text-yellow-400" />,
    title: 'Os 12 Signos do Zodíaco',
    content: `Os signos representam 12 arquétipos fundamentais de energia, divididos em Elementos e Modalidades:

🔥 Fogo (Ação e Inspiração):
♈ Áries — Iniciativa, coragem, impulsividade
♌ Leão — Expressão, criatividade, liderança
♐ Sagitário — Expansão, filosofia, aventura

🌍 Terra (Praticidade e Estabilidade):
♉ Touro — Segurança, valores, persistência
♍ Virgem — Análise, serviço, aperfeiçoamento
♑ Capricórnio — Ambição, estrutura, disciplina

💨 Ar (Intelecto e Comunicação):
♊ Gêmeos — Curiosidade, versatilidade, comunicação
♎ Libra — Equilíbrio, harmonia, relacionamentos
♒ Aquário — Inovação, independência, humanitarismo

💧 Água (Emoção e Intuição):
♋ Câncer — Proteção, emoção, família
♏ Escorpião — Intensidade, transformação, poder
♓ Peixes — Compaixão, espiritualidade, imaginação

No AstroClock, cada signo ocupa exatamente 30° da roda zodiacal (totalizando 360°). A posição de um planeta num signo indica como aquela energia planetária se manifesta.`
  },
  {
    id: 'efemerides',
    icon: <MapPin size={16} className="text-emerald-400" />,
    title: 'O que são Efemérides',
    content: `Efemérides (do grego ephēmeris — "diário") são tabelas astronômicas que registram as posições dos corpos celestes para cada dia. Historicamente, eram publicadas em livros anuais e constituíam a ferramenta essencial de todo astrólogo.

O AstroClock calcula efemérides em tempo real usando o modelo VSOP87, desenvolvido pelo Bureau des Longitudes de Paris. Este algoritmo proporciona precisão de frações de segundo de arco para os planetas do sistema solar.

As coordenadas exibidas são:
• Longitude Eclíptica — posição ao longo do zodíaco (0° a 360°)
• Velocidade — movimento diário do planeta em graus por dia
• Signo — em qual dos 12 signos o planeta se encontra
• Grau no Signo — posição específica dentro do signo (0° a 29°59')

A notação astrológica tradicional (ex: "15° ♈ 23'") significa: 15 graus e 23 minutos de arco dentro do signo de Áries.

O que antes exigia consultar livros de centenas de páginas, o AstroClock oferece instantaneamente e com visualização interativa — uma revolução no acesso à informação astrológica.`
  },
];

export function KnowledgeDrawer({ isOpen, onClose }: KnowledgeDrawerProps) {
  const [expandedTopic, setExpandedTopic] = React.useState<string | null>(null);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm ${isClosing ? 'overlay-exit' : 'overlay-enter'}`}
        onClick={handleClose}
      />

      {/* Drawer panel */}
      <aside
        className={`relative w-full max-w-md h-full flex flex-col ${isClosing ? 'drawer-exit' : 'drawer-enter'}`}
        style={{
          background: 'rgba(8, 4, 18, 0.92)',
          backdropFilter: 'blur(24px) saturate(140%)',
          borderRight: '1px solid rgba(139, 92, 246, 0.15)',
          boxShadow: '4px 0 40px rgba(0, 0, 0, 0.5), 0 0 80px rgba(139, 92, 246, 0.05)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-purple-500/10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-outfit tracking-wide text-purple-100">
                Guia Astrológico
              </h2>
              <p className="text-[10px] text-purple-400 uppercase tracking-widest font-medium">
                Aprenda sobre Astrologia
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-100 transition-all duration-200 border border-purple-500/10 hover:border-purple-500/30"
            aria-label="Fechar guia"
          >
            <X size={16} />
          </button>
        </div>

        {/* Topics list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {TOPICS.map((topic) => {
            const isExpanded = expandedTopic === topic.id;

            return (
              <div
                key={topic.id}
                className="rounded-xl border border-purple-500/10 overflow-hidden transition-all duration-300"
                style={{
                  background: isExpanded
                    ? 'rgba(139, 92, 246, 0.06)'
                    : 'rgba(10, 6, 22, 0.3)',
                }}
              >
                {/* Topic header button */}
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left group hover:bg-purple-500/5 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex-shrink-0">{topic.icon}</span>
                    <span className="text-sm font-semibold text-purple-200 group-hover:text-purple-100 transition-colors">
                      {topic.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-purple-400 transition-transform duration-300 flex-shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="pt-2 border-t border-purple-500/10">
                      <p className="text-[13px] text-purple-300/90 leading-[1.75] whitespace-pre-line font-sans">
                        {topic.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-purple-500/10">
          <p className="text-[10px] text-purple-500 text-center leading-relaxed">
            Conteúdo educacional baseado na tradição astrológica ocidental.
            <br />
            Novos tópicos são adicionados regularmente.
          </p>
        </div>
      </aside>
    </div>
  );
}
