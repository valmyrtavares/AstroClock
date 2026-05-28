import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, dateStr, city, state, country, planetsList, aspectList, ascendantSign, ascendantDegree } = await request.json();

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
- Signo Ascendente Calculado: ${ascendantSign} (${ascendantDegree}°)

Coordenadas Planetárias Calculadas (Eclíptica Geocêntrica):
${planetsList}

Aspectos Astrológicos Ativos no Nascimento:
${aspectList || 'Nenhum aspecto significativo ativo.'}

Estruture a leitura em português de forma clara, empoderadora e inspiradora em 4 seções principais usando Markdown:
1. **Introdução Cósmica**: A assinatura de energia essencial do nascimento.
2. **Luminares e Equilíbrio Essencial (Sol e Lua)**: Análise profunda do Sol (sua essência, propósito de ego) e da Lua (suas reações, necessidades emocionais e instintos), mostrando como equilibrá-los.
3. **Ascendente e Dinâmica de Expressão (Ascendente em ${ascendantSign})**: Uma análise aprofundada do seu signo Ascendente (${ascendantSign} a ${ascendantDegree}°). Explique em detalhes como este signo atua como sua máscara social, sua primeira impressão física/comportamental ao mundo e o canal de manifestação da sua jornada. Conecte o Ascendente com a dinâmica dos planetas pessoais (Mercúrio, Vênus, Marte).
4. **Caminho Evolutivo (Aspectos e Superação)**: Uma leitura integradora de como os aspectos planetários listados agem como potenciais natos e desafios dinâmicos a serem superados em sua jornada de autoconhecimento.

Traga uma análise profunda, acolhedora e construtiva, sem jargões desnecessários, focando em conselhos evolutivos de autoconhecimento.`;

    let model = 'gemini-2.5-flash';
    let response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
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
      const errMsg = errData?.error?.message || '';
      
      // If primary model is busy/throttled, immediately attempt fallback to gemini-1.5-flash
      if (errMsg.includes('high demand') || errMsg.includes('limit') || response.status === 429 || response.status === 503) {
        console.warn(`Primary model ${model} busy. Swapping to fallback gemini-1.5-flash...`);
        model = 'gemini-1.5-flash';
        
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
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
      }
    }

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
