export interface ContractorService {
  id: string;
  name: string;
  description: string;
  hourlyRate: number;
}

export interface Contractor {
  idUserDetails: number;
  fantasyName: string;
  birthDate: string; // date em string ISO
  lastSeen: string; // date em string ISO
  avatar: string;
  city: string;
  suburb: string;
  state: string;
  biography: string;
  audio: string;
  age: number;
  viewersCount: number;
  // Propriedades opcionais para página de detalhes
  bio?: string; // biografia longa para detalhes
  photos?: string[]; // galeria de fotos
  services?: ContractorService[]; // serviços oferecidos
};
