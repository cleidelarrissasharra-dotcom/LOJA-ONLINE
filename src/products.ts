import { Product } from './types';

export const products: Product[] = [
  {
    id: 'fone-bluetooth-premium',
    name: 'Fone de Ouvido Bluetooth Premium',
    description: 'Experimente a liberdade sem fios com cancelamento de ruído ativo e bateria que dura até 30 horas.',
    price: 299.90,
    rating: 4.9,
    reviewsCount: 124,
    category: 'Áudio',
    badge: 'Mais Vendido',
    features: [
      'Cancelamento de Ruído Ativo (ANC)',
      'Bateria de até 30 horas de autonomia',
      'Conexão Bluetooth 5.2 estável',
      'Drivers de áudio de alta fidelidade de 40mm',
      'Microfone embutido para chamadas HD'
    ]
  },
  {
    id: 'teclado-mecanico-rgb',
    name: 'Teclado Mecânico Compacto RGB',
    description: 'Teclas mecânicas ultra-responsivas com iluminação RGB personalizável e conexão USB-C removível.',
    price: 189.90,
    rating: 4.8,
    reviewsCount: 88,
    category: 'Periféricos',
    badge: 'Lançamento',
    features: [
      'Switches Mecânicos Outemu Red (Silenciosos)',
      'Layout compacto 60% para maior espaço',
      'Cabo USB-C trançado e removível',
      'Iluminação RGB com 18 efeitos dinâmicos',
      'Tecnologia Anti-Ghosting em todas as teclas'
    ]
  },
  {
    id: 'magsafe-pro-powerbank',
    name: 'Carregador Magnético MagSafe Pro',
    description: 'Carregador portátil por indução magnética de 10.000mAh, ideal para carregamento rápido inteligente em qualquer lugar.',
    price: 149.90,
    rating: 4.7,
    reviewsCount: 56,
    category: 'Acessórios',
    badge: 'Promoção',
    features: [
      'Capacidade real de 10.000 mAh',
      'Alinhamento magnético forte (MagSafe)',
      'Carregamento sem fio de 15W',
      'Saída adicional USB-C PD de 20W',
      'Indicador de bateria em LED digital'
    ]
  },
  {
    id: 'smartwatch-sport-active',
    name: 'Smartwatch Sport Active',
    description: 'Acompanhamento esportivo de alto desempenho com GPS integrado, monitoramento cardíaco contínuo e tela AMOLED.',
    price: 349.90,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Wearables',
    badge: 'Destaque',
    features: [
      'Tela AMOLED colorida de 1.43 polegadas',
      'Monitor de batimentos cardíacos e oxigenação (SpO2)',
      'GPS integrado de alta precisão',
      'Mais de 90 modos de treino assistidos',
      'Resistência à água ATM 5 (até 50 metros)'
    ]
  }
];
