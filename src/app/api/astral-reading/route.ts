import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, dateStr, city, state, country, planetsList, aspectList } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: 'Chave de API do Gemini não configurada no servidor. Por favor, configure GEMINI_API_KEY no arquivo .env.local do servidor.'
      }, { status: 500 });
    }

    const promptText = `Aja como um astrólogo profissional e experiente. Faça uma análise profunda, integrada e de autoconhecimento do seguinte Mapa Astral.

Dados do Nascimento:
- Nome do Peregrino: ${name}
- Data e Hora: ${dateStr}
- Local de Nascimento: ${city}, ${state} - ${country}

Coordenadas Planetárias Calculadas (Eclíptica Geocêntrica):
${planetsList}

Aspectos Astrológicos Ativos no Nascimento:
${aspectList || 'Nenhum aspecto significativo ativo.'}

Estruture a leitura em português de forma clara, empoderadora e inspiradora em 4 seções principais usando Markdown:
1. **Introdução Cósmica**: A assinatura de energia essencial do nascimento.
2. **Luminares e Equilíbrio Essencial (Sol e Lua)**: Análise profunda do Sol (sua essência, propósito de ego) e da Lua (suas reações, necessidades emocionais e instintos), mostrando como equilibrá-los.
3. **Ascendente e Dinâmica de Expressão**: Com base na data/hora e coordenadas fornecidas, deduza/interprete o signo Ascendente e descreva a sua importância como a sua máscara social e primeira impressão, relacionando com a energia dos planetas pessoais (Mercúrio, Vênus, Marte).
4. **Caminho Evolutivo (Aspectos e Superação)**: Uma leitura integradora de como os aspectos planetários listados agem como potenciais natos e desafios dinâmicos a serem superados em sua jornada de autoconhecimento.

Traga uma análise profunda, acolhedora e construtiva, sem jargões desnecessários, focando em conselhos evolutivos de autoconhecimento.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData?.error?.message || 'Falha ao conectar com o oráculo do Gemini.');
    }

    const data = await response.json();
    const readingText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!readingText) {
      throw new Error('O oráculo não retornou nenhuma interpretação. Tente novamente.');
    }

    return NextResponse.json({ reading: readingText });
  } catch (error: any) {
    console.error('Erro no oráculo de IA:', error);
    return NextResponse.json({ error: error.message || 'Ocorreu um erro interno de processamento.' }, { status: 500 });
  }
}
