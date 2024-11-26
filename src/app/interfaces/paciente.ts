export interface Paciente  {
  idPaciente: number;
  nombre: string;
  apellidoPaterno: string ;
  apellidoMaterno: string ;
  email: string ;
  telefono: string ;
  fechaNacimiento?: Date;
  sexo: string ;
  foto: string;
  estadoCivil: string ;
  edad : number | null;  // Agrega el campo edad
  ocupacion: string ;
  domicilios?: string[] | null ; // Cambia el tipo si es necesario
}
