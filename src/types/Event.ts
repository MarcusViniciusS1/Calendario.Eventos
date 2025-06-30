export interface Event {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  hora: string;
  local: string;
  organizador: string;
}

export interface LoginCredentials {
  usuario: string;
  senha: string;
}