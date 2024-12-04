export interface Queja {
    id?: number; // Opcional, porque el backend lo genera
    idUsuarioSolicita?: number;
    idUsuarioNecesita?: number;
    estatus: number;
    tipo: number;
    descripcion: string;
  }