export interface StateData {
  sigla: string;
  nome: string;
  cidades: string[];
}

export const BRAZIL_STATES: StateData[] = [
  {
    sigla: 'AC',
    nome: 'Acre',
    cidades: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó']
  },
  {
    sigla: 'AL',
    nome: 'Alagoas',
    cidades: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Penedo']
  },
  {
    sigla: 'AP',
    nome: 'Amapá',
    cidades: ['Macapá', 'Santana', 'Laranjal do Jari', 'Mazagão', 'Oiapoque']
  },
  {
    sigla: 'AM',
    nome: 'Amazonas',
    cidades: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari', 'Tefé']
  },
  {
    sigla: 'BA',
    nome: 'Bahia',
    cidades: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna', 'Juazeiro', 'Ilhéus', 'Porto Seguro', 'Barreiras', 'Jequié']
  },
  {
    sigla: 'CE',
    nome: 'Ceará',
    cidades: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato', 'Itapipoca']
  },
  {
    sigla: 'DF',
    nome: 'Distrito Federal',
    cidades: ['Brasília', 'Taguatinga', 'Ceilândia', 'Gama', 'Sobradinho']
  },
  {
    sigla: 'ES',
    nome: 'Espírito Santo',
    cidades: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Cachoeiro de Itapemirim', 'Linhares', 'Colatina']
  },
  {
    sigla: 'GO',
    nome: 'Goiás',
    cidades: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Rio Verde', 'Luziânia', 'Águas Lindas de Goiás', 'Catalão', 'Itumbiara']
  },
  {
    sigla: 'MA',
    nome: 'Maranhão',
    cidades: ['São Luís', 'Imperatriz', 'Timon', 'Caxias', 'Codó', 'Açailândia', 'Bacabal']
  },
  {
    sigla: 'MT',
    nome: 'Mato Grosso',
    cidades: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra', 'Sorriso', 'Barra do Garças']
  },
  {
    sigla: 'MS',
    nome: 'Mato Grosso do Sul',
    cidades: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Nova Andradina']
  },
  {
    sigla: 'MG',
    nome: 'Minas Gerais',
    cidades: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Betim', 'Montes Claros', 'Ribeirão das Neves', 'Uberaba', 'Governador Valadares', 'Ipatinga', 'Sete Lagoas', 'Divinópolis', 'Poços de Caldas']
  },
  {
    sigla: 'PA',
    nome: 'Pará',
    cidades: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal', 'Parauapebas', 'Itaituba', 'Altamira', 'Tucuruí']
  },
  {
    sigla: 'PB',
    nome: 'Paraíba',
    cidades: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras']
  },
  {
    sigla: 'PR',
    nome: 'Paraná',
    cidades: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais', 'Foz do Iguaçu', 'Colombo', 'Guarapuava', 'Paranaguá', 'Apucarana', 'Toledo']
  },
  {
    sigla: 'PE',
    nome: 'Pernambuco',
    cidades: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista', 'Cabo de Santo Agostinho', 'Garanhuns', 'Vitória de Santo Antão']
  },
  {
    sigla: 'PI',
    nome: 'Piauí',
    cidades: ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Piripiri', 'Campo Maior']
  },
  {
    sigla: 'RJ',
    nome: 'Rio de Janeiro',
    cidades: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Campos dos Goytacazes', 'Belford Roxo', 'São João de Meriti', 'Petrópolis', 'Volta Redonda', 'Macaé', 'Cabo Frio', 'Nova Friburgo', 'Angra dos Reis']
  },
  {
    sigla: 'RN',
    nome: 'Rio Grande do Norte',
    cidades: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Macaíba', 'Caicó']
  },
  {
    sigla: 'RS',
    nome: 'Rio Grande do Sul',
    cidades: ['Porto Alegre', 'Caxias do Sul', 'Canoas', 'Pelotas', 'Santa Maria', 'Gravataí', 'Viamão', 'Novo Hamburgo', 'Passo Fundo', 'Rio Grande', 'Bento Gonçalves', 'Erechim']
  },
  {
    sigla: 'RO',
    nome: 'Rondônia',
    cidades: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Cacoal', 'Vilhena']
  },
  {
    sigla: 'RR',
    nome: 'Roraima',
    cidades: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí']
  },
  {
    sigla: 'SC',
    nome: 'Santa Catarina',
    cidades: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Criciúma', 'Itajaí', 'Jaraguá do Sul', 'Lages', 'Balneário Camboriú', 'Brusque', 'Tubarão']
  },
  {
    sigla: 'SP',
    nome: 'São Paulo',
    cidades: ['São Paulo', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'São José dos Campos', 'Ribeirão Preto', 'Sorocaba', 'Santos', 'Mauá', 'São José do Rio Preto', 'Mogi das Cruzes', 'Diadema', 'Jundiaí', 'Piracicaba', 'Bauru', 'Itapevi', 'Guarulhos']
  },
  {
    sigla: 'SE',
    nome: 'Sergipe',
    cidades: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão']
  },
  {
    sigla: 'TO',
    nome: 'Tocantins',
    cidades: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins']
  }
];
