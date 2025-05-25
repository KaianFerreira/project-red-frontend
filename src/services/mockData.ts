import { Person } from '../types/person'
import { User } from '../types/user'
import { Message, Conversation } from '../types/chat'
import { Contractor } from '../types/contractor'

// Current user
const currentUser: User = {
  id: 'current-user',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  dateOfBirth: '1995-06-15',
  bio: 'Aventureiro, entusiasta de café e amante de tecnologia. Procurando alguém para compartilhar os momentos da vida.',
  profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
  location: 'São Paulo, SP',
  interests: ['caminhada', 'fotografia', 'viagem', 'café'],
  createdAt: '2023-01-15T08:30:00Z',
}

// Sample users for authentication
const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    dateOfBirth: '1997-03-22',
    bio: 'Amante de livros, entusiasta de yoga. Procurando conexões genuínas.',
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'Rio de Janeiro, RJ',
    interests: ['leitura', 'yoga', 'culinária', 'arte'],
    createdAt: '2023-02-10T14:20:00Z',
  },
  // Contractor mockado completo
  {
    id: 'contractor-1',
    name: 'Isabella Santos',
    email: 'isabella@example.com',
    dateOfBirth: '1995-08-15',
    bio: 'Profissional dedicada e experiente. Especializada em acompanhamento para eventos sociais, jantares executivos e viagens de negócios. Sempre elegante, discreta e com excelente conversação. Formada em Relações Públicas, falo inglês fluentemente e tenho experiência com protocolo social.',
    profileImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
    location: 'São Paulo, SP',
    interests: ['arte', 'culinária', 'viagem', 'música', 'teatro'],
    createdAt: '2023-01-20T10:30:00Z',
    userType: 'contractor',
    // Dados específicos do contractor
    fantasyName: 'Isabella Rosé',
    city: 'São Paulo',
    suburb: 'Jardins',
    state: 'SP',
    hourlyRate: '350',
    services: `🌟 **Serviços Oferecidos:**

**Acompanhamento Social:**
• Eventos corporativos e networking
• Jantares executivos e reuniões sociais
• Teatros, óperas e eventos culturais
• Vernissages e exposições de arte

**Acompanhamento para Viagens:**
• Viagens de negócios nacionais e internacionais
• City tours e turismo cultural
• Eventos e convenções

**Características:**
• Conversação refinada e inteligente
• Fluência em inglês e espanhol
• Conhecimento em etiqueta e protocolo
• Discrição absoluta garantida
• Apresentação sempre impecável

**Especialidades:**
• Ambiente corporativo e executivo
• Eventos de alto padrão
• Acompanhamento cultural
• Viagens internacionais`,
    availability: `🗓️ **Horários de Atendimento:**

**Segunda a Quinta:**
14h às 23h

**Sexta-feira:**
16h às 02h

**Sábado:**
12h às 02h

**Domingo:**
14h às 22h

**Observações:**
• Agendamento com antecedência mínima de 2 horas
• Para eventos e viagens, agendamento com 24h de antecedência
• Disponível para pernoites mediante negociação
• Atendo em toda Grande São Paulo
• Viagens para outras cidades aceitas com agendamento prévio`,
    additionalPhotos: [
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
]

// Sample people for swiping
const people: Person[] = [
  {
    id: 'person-1',
    name: 'Sophie Chen',
    age: 28,
    bio: 'Foodie, travel enthusiast, and aspiring photographer. Love to explore new cuisines and cultures.',
    images: [
      'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 5,
    interests: ['travel', 'photography', 'food']
  },
  {
    id: 'person-2',
    name: 'Jake Rivera',
    age: 31,
    bio: 'Musician by night, software developer by day. Looking for someone to share adventures with.',
    images: [
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 3,
    interests: ['music', 'coding', 'hiking']
  },
  {
    id: 'person-3',
    name: 'Emily Parker',
    age: 26,
    bio: 'Yoga instructor who loves the outdoors. Always planning my next hiking trip or beach day.',
    images: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 8,
    interests: ['yoga', 'hiking', 'beach']
  },
  {
    id: 'person-4',
    name: 'Michael Scott',
    age: 34,
    bio: 'Marketing executive who loves comedy and good conversations. Looking for someone who appreciates The Office references.',
    images: [
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 12,
    interests: ['comedy', 'movies', 'dining']
  },
  {
    id: 'person-5',
    name: 'Olivia Kim',
    age: 29,
    bio: 'Art curator with a passion for indie films and vintage fashion. Always on the lookout for hidden gems in the city.',
    images: [
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 7,
    interests: ['art', 'fashion', 'films']
  },
  {
    id: 'person-6',
    name: 'David Lopez',
    age: 30,
    bio: 'Chef who loves to experiment with fusion cuisine. My perfect date involves cooking together and a good bottle of wine.',
    images: [
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 10,
    interests: ['cooking', 'wine', 'food']
  },
  {
    id: 'person-7',
    name: 'Zoe Williams',
    age: 27,
    bio: 'Veterinarian and animal lover. When I\'m not taking care of pets, I\'m exploring nature trails with my dog Max.',
    images: [
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 15,
    interests: ['animals', 'hiking', 'nature']
  },
  {
    id: 'person-8',
    name: 'James Carter',
    age: 33,
    bio: 'Architect with a passion for sustainable design. Love discussing ideas over coffee in cozy cafes.',
    images: [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 6,
    interests: ['architecture', 'coffee', 'sustainability']
  },
  {
    id: 'person-9',
    name: 'Natalie Chen',
    age: 25,
    bio: 'Dancer and fitness instructor. Always looking for new ways to stay active and have fun while doing it.',
    images: [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 9,
    interests: ['dance', 'fitness', 'music']
  },
  {
    id: 'person-10',
    name: 'Ryan Miller',
    age: 32,
    bio: 'Startup founder who loves adrenaline sports. Always up for a challenge, whether it\'s in business or rock climbing.',
    images: [
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 4,
    interests: ['entrepreneurship', 'rock climbing', 'adventure']
  },
  {
    id: 'person-11',
    name: 'Mia Johnson',
    age: 29,
    bio: 'Travel blogger who has been to 30 countries. Looking for someone to join me on my next adventure.',
    images: [
      'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 11,
    interests: ['travel', 'writing', 'photography']
  },
  {
    id: 'person-12',
    name: 'Daniel Park',
    age: 31,
    bio: 'Music producer who loves to discover new sounds. Coffee addict and vinyl collector.',
    images: [
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 8,
    interests: ['music', 'vinyl', 'coffee']
  },
  {
    id: 'person-13',
    name: 'Sarah Thompson',
    age: 28,
    bio: 'Environmental scientist passionate about ocean conservation. Love beach cleanups and underwater photography.',
    images: [
      'https://images.pexels.com/photos/1382728/pexels-photo-1382728.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 13,
    interests: ['environment', 'diving', 'photography']
  },
  {
    id: 'person-14',
    name: 'Adam Garcia',
    age: 30,
    bio: 'History teacher and weekend tour guide. I can show you the hidden gems of the city that tourists never see.',
    images: [
      'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 7,
    interests: ['history', 'travel', 'teaching']
  },
  {
    id: 'person-15',
    name: 'Rachel Lee',
    age: 27,
    bio: 'Pastry chef who loves creating desserts inspired by my travels. Always experimenting with new flavors.',
    images: [
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    distance: 5,
    interests: ['baking', 'travel', 'food']
  }
]

const contractors: Contractor[] = [
  {
    idUserDetails: 1,
    fantasyName: 'Ana Bella',
    birthDate: '1995-08-15T00:00:00Z',
    lastSeen: '2024-06-01T12:34:56Z',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'São Paulo',
    suburb: 'Centro',
    state: 'SP',
    biography: 'Profissional dedicada, simpática e experiente. Atendimento de alto nível, sempre com discrição e elegância.',
    audio: '',
    age: 28,
    viewersCount: 42
  },
  {
    idUserDetails: 2,
    fantasyName: 'Isabella Rosé',
    birthDate: '1995-08-15T00:00:00Z',
    lastSeen: '2024-06-01T10:20:30Z',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'São Paulo',
    suburb: 'Jardins',
    state: 'SP',
    biography: 'Especializada em acompanhamento executivo e eventos sociais. Formada em Relações Públicas, fluente em inglês. Conversação refinada e apresentação impecável.',
    audio: '',
    age: 28,
    viewersCount: 156,
    bio: 'Profissional dedicada e experiente, especializada em acompanhamento para eventos sociais, jantares executivos e viagens de negócios. Sempre elegante, discreta e com excelente conversação.\n\nFormada em Relações Públicas com especialização em Protocolo Social, falo inglês e espanhol fluentemente. Tenho experiência internacional e conhecimento profundo em etiqueta empresarial.\n\nMinhas especialidades incluem ambiente corporativo, eventos de alto padrão, acompanhamento cultural e viagens internacionais. Garanto discrição absoluta e apresentação sempre impecável.',
    photos: [
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'social-events',
        name: 'Eventos Sociais',
        description: 'Acompanhamento para eventos corporativos, networking, teatros, óperas e exposições de arte',
        hourlyRate: 350
      },
      {
        id: 'business-travel',
        name: 'Viagens de Negócios',
        description: 'Acompanhamento para viagens nacionais e internacionais, convenções e reuniões executivas',
        hourlyRate: 400
      },
      {
        id: 'executive-dinners',
        name: 'Jantares Executivos',
        description: 'Acompanhamento para jantares corporativos e reuniões sociais de alto padrão',
        hourlyRate: 300
      },
      {
        id: 'cultural-events',
        name: 'Eventos Culturais',
        description: 'City tours, eventos culturais e acompanhamento turístico com conhecimento local',
        hourlyRate: 280
      }
    ]
  },
  {
    idUserDetails: 3,
    fantasyName: 'Bruna Lima',
    birthDate: '1997-04-10T00:00:00Z',
    lastSeen: '2024-06-01T13:20:00Z',
    avatar: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Rio de Janeiro',
    suburb: 'Copacabana',
    state: 'RJ',
    biography: 'Atendimento com carinho e atenção. Sempre pronta para surpreender e encantar.',
    audio: '',
    age: 26,
    viewersCount: 58,
    bio: 'Olá! Sou a Bruna, uma carioca apaixonada pela vida e sempre pronta para novas experiências. Tenho 26 anos e ofereço um atendimento personalizado e cheio de carinho.\n\nGosto de conhecer pessoas interessantes e criar momentos únicos e especiais. Sou discreta, educada e sempre mantenho um clima descontraído e agradável.\n\nAtendo em Copacabana e região, sempre com total discrição e respeito. Venha me conhecer!',
    photos: [
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'companionship',
        name: 'Acompanhamento',
        description: 'Acompanhamento para jantares, eventos sociais e passeios pela cidade',
        hourlyRate: 250
      },
      {
        id: 'massage',
        name: 'Massagem Relaxante',
        description: 'Massagem terapêutica para relaxamento e bem-estar',
        hourlyRate: 200
      }
    ]
  },
  {
    idUserDetails: 4,
    fantasyName: 'Camila Souza',
    birthDate: '1996-12-22T00:00:00Z',
    lastSeen: '2024-06-01T11:45:00Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Belo Horizonte',
    suburb: 'Savassi',
    state: 'MG',
    biography: 'Sorriso fácil, alto astral e muito profissionalismo. Venha viver momentos inesquecíveis.',
    audio: '',
    age: 27,
    viewersCount: 35,
    bio: 'Oi, meu amor! Sou a Camila, uma mineira de coração aberto e sorriso sempre presente. Tenho 27 anos e adoro conhecer pessoas novas e especiais.\n\nMeu atendimento é baseado no carinho, respeito e muita alegria. Gosto de criar um ambiente descontraído onde você se sinta completamente à vontade.\n\nSou muito profissional e discreta. Atendo na região da Savassi com todo conforto e privacidade que você merece.',
    photos: [
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'dinner-date',
        name: 'Jantar Romântico',
        description: 'Acompanhamento para jantares íntimos e românticos',
        hourlyRate: 280
      },
      {
        id: 'city-tour',
        name: 'City Tour',
        description: 'Passeios pelos pontos turísticos de Belo Horizonte',
        hourlyRate: 220
      },
      {
        id: 'therapy',
        name: 'Terapia do Carinho',
        description: 'Momentos de relaxamento e bem-estar com muito carinho',
        hourlyRate: 300
      }
    ]
  },
  {
    idUserDetails: 5,
    fantasyName: 'Débora Torres',
    birthDate: '1998-02-05T00:00:00Z',
    lastSeen: '2024-06-01T10:10:00Z',
    avatar: 'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Curitiba',
    suburb: 'Batel',
    state: 'PR',
    biography: 'Beleza natural, simpatia e atendimento diferenciado. Experimente algo novo!',
    audio: '',
    age: 25,
    viewersCount: 27,
    bio: 'Oi! Eu sou a Débora, uma paranaense cheia de energia e vitalidade! Aos 25 anos, tenho uma paixão pela vida e adoro conhecer pessoas especiais.\n\nMinha especialidade é criar momentos únicos e memoráveis. Tenho um jeito carinhoso e natural de me relacionar, sempre respeitando os limites e desejos de cada cliente.\n\nSou muito comunicativa, adoro uma boa conversa e garanto que nosso encontro será inesquecível. Atendo no Batel e região com toda discrição.',
    photos: [
      'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130625/pexels-photo-1130625.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'relaxation',
        name: 'Relaxamento Total',
        description: 'Momentos de puro relaxamento e bem-estar em ambiente aconchegante',
        hourlyRate: 240
      },
      {
        id: 'conversation',
        name: 'Companhia & Conversa',
        description: 'Companhia agradável para bate-papo, filmes ou momentos de descontração',
        hourlyRate: 180
      },
      {
        id: 'events',
        name: 'Eventos Sociais',
        description: 'Acompanhamento para festas, encontros sociais e confraternizações',
        hourlyRate: 320
      }
    ]
  },
  {
    idUserDetails: 6,
    fantasyName: 'Evelyn Martins',
    birthDate: '1994-11-30T00:00:00Z',
    lastSeen: '2024-06-01T09:00:00Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Porto Alegre',
    suburb: 'Moinhos de Vento',
    state: 'RS',
    biography: 'Elegância e sofisticação em cada detalhe. Atendimento VIP para clientes exigentes.',
    audio: '',
    age: 29,
    viewersCount: 61,
    bio: 'Olá, querido! Sou a Evelyn, uma gaúcha sofisticada e elegante. Com 29 anos de experiência de vida, ofereço um atendimento refinado e exclusivo.\n\nEspecializo-me em clientes que valorizam a qualidade, discrição e sofisticação. Meu estilo é único, sempre impecável e adequado para qualquer ocasião.\n\nTenho formação superior e ampla cultura geral, o que me permite manter conversas interessantes sobre diversos assuntos. Atendo em ambiente luxuoso nos Moinhos de Vento.',
    photos: [
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'vip-experience',
        name: 'Experiência VIP',
        description: 'Atendimento premium com toda sofisticação e requinte que você merece',
        hourlyRate: 450
      },
      {
        id: 'luxury-dinner',
        name: 'Jantar de Luxo',
        description: 'Acompanhamento para restaurantes finos e eventos gastronômicos',
        hourlyRate: 400
      },
      {
        id: 'business-companion',
        name: 'Acompanhante Executiva',
        description: 'Presença elegante para eventos corporativos e reuniões de negócios',
        hourlyRate: 500
      }
    ]
  },
  {
    idUserDetails: 7,
    fantasyName: 'Fernanda Dias',
    birthDate: '1999-06-18T00:00:00Z',
    lastSeen: '2024-06-01T14:05:00Z',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Brasília',
    suburb: 'Asa Sul',
    state: 'DF',
    biography: 'Jovem, divertida e cheia de energia. Atendimento com muita alegria e respeito.',
    audio: '',
    age: 24,
    viewersCount: 39,
    bio: 'Oi, lindinho! Sou a Fernanda, tenho 24 anos e sou de Brasília. Sou daquelas pessoas que levam alegria para onde vão! 😊\n\nAdoro rir, conversar e criar um clima super descontraído. Meu atendimento é sempre com muito carinho, respeito e diversão. Acredito que os melhores momentos são aqueles onde nos sentimos completamente à vontade.\n\nSou jovem, mas muito madura no que faço. Garanto total discrição e profissionalismo, sempre com aquele jeitinho brasileiro de ser. Vem conhecer a capital comigo!',
    photos: [
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1130624/pexels-photo-1130624.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    services: [
      {
        id: 'young-energy',
        name: 'Energia Jovem',
        description: 'Diversão e descontração com toda energia da juventude',
        hourlyRate: 220
      },
      {
        id: 'city-exploration',
        name: 'Explorando Brasília',
        description: 'Passeios pelos pontos turísticos e culturais da capital',
        hourlyRate: 200
      },
      {
        id: 'casual-companion',
        name: 'Companhia Descontraída',
        description: 'Momentos relaxantes e divertidos sem formalidades',
        hourlyRate: 250
      }
    ]
  },
  {
    idUserDetails: 8,
    fantasyName: 'Gabriela Rocha',
    birthDate: '1993-09-12T00:00:00Z',
    lastSeen: '2024-06-01T08:30:00Z',
    avatar: 'https://images.pexels.com/photos/1130625/pexels-photo-1130625.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Salvador',
    suburb: 'Barra',
    state: 'BA',
    biography: 'Experiência, charme e muita simpatia. Atendimento inesquecível.',
    audio: '',
    age: 30,
    viewersCount: 44
  },
  {
    idUserDetails: 9,
    fantasyName: 'Helena Castro',
    birthDate: '1995-03-27T00:00:00Z',
    lastSeen: '2024-06-01T15:15:00Z',
    avatar: 'https://images.pexels.com/photos/247295/pexels-photo-247295.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Recife',
    suburb: 'Boa Viagem',
    state: 'PE',
    biography: 'Atendimento com discrição, carinho e muita dedicação. Venha se surpreender.',
    audio: '',
    age: 28,
    viewersCount: 51
  },
  {
    idUserDetails: 10,
    fantasyName: 'Isabela Mendes',
    birthDate: '1997-07-19T00:00:00Z',
    lastSeen: '2024-06-01T16:00:00Z',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Fortaleza',
    suburb: 'Meireles',
    state: 'CE',
    biography: 'Beleza marcante e atendimento de primeira. Sempre pronta para agradar.',
    audio: '',
    age: 26,
    viewersCount: 33
  },
  {
    idUserDetails: 11,
    fantasyName: 'Juliana Alves',
    birthDate: '1996-01-08T00:00:00Z',
    lastSeen: '2024-06-01T17:25:00Z',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800',
    city: 'Florianópolis',
    suburb: 'Centro',
    state: 'SC',
    biography: 'Sorriso encantador e atendimento personalizado. Venha viver momentos únicos.',
    audio: '',
    age: 27,
    viewersCount: 47
  }
]


export const mockedData = {
  currentUser,
  users,
  contractors,
}