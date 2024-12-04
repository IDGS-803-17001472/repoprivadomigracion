export interface UpdatePacienteDto {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  fechaNacimiento: Date;
  sexo: string;
  estadoCivil: string;
  ocupacion: string;
  notasAdicionales: string;
  // Agrega otros campos si es necesario
}
