export interface DiariosPaciente {
  id: number;
  contenido: string;
  fecha: string;
  paciente: {
    id: number;
    persona: {
      nombre: string;
      apellidoMaterno: string;
      apelllidoPaterno: string;
    };
  };
  mediciones: Medicion[];
}

export interface Medicion {
  emocionName: string;
  nivel: number;
}

export interface Persona {
  nombre: string;
}
