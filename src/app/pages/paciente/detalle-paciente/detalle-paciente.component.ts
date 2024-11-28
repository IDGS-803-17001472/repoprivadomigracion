import { Paciente } from '../../../interfaces/paciente2';
import {CommonModule} from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { Component, inject, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cita } from '../../../interfaces/cita';
import { PacienteService } from '../../../services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdatePacienteDto } from '../../../interfaces/UpdatePacienteDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-paciente',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule,
    MatCardModule
  ],  
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.scss'
})
export class DetallePacienteComponent  implements OnInit {
  paciente?: Paciente
  idPaciente: number | null = null;
  pacienteService = inject(PacienteService);
  matSnackBar = inject(MatSnackBar);

  citas: Cita[] = [
    { fecha: '2024-08-12', hora: '09:00', descripcion: 'Revisión general' },
    { fecha: '2024-08-15', hora: '11:00', descripcion: 'Consulta especializada' },
    // Agrega más citas si es necesario
  ];

  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idPaciente = id ? +id : null; // Convertir el id a número
      if (this.idPaciente) {
        this.pacienteService.getPaciente(this.idPaciente).subscribe({
          next: (response) => {

              console.log('paciente:', response);
              this.paciente = response; // Assuming `pacientes` is where you store the list
              this.paciente.edad = this.calcularEdad(this.paciente.fechaNacimiento);
              this.paciente.fechaDisplay = this.paciente.fechaNacimiento!.toString().split('T')[0]; // "2024-08-30"
              console.log('paciente obj:', response);
          },
          error: (error) => {
              this.matSnackBar.open(error.error.message, 'Close', {
                  duration: 5000,
                  horizontalPosition: 'center',
              });
          },
      });
        console.log('ID del paciente:', this.idPaciente);
      } else {
        console.error('ID de paciente no definido');
      }
    });
  }

  calcularEdad(fechaNacimiento?: Date ): number | null {
    if (!fechaNacimiento) return null;

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }


  activarEdicion(): void {
    this.editMode = true;
  }

  cancelarEdicion(): void {
    this.editMode = false;
  }

  // detalle-paciente.component.ts
guardarCambios(): void {
  if (this.paciente && this.idPaciente !== null) {
    const updatePacienteDto: UpdatePacienteDto = {
      nombre: this.paciente.nombre!,
      apellidoPaterno: this.paciente.apellidoPaterno!,
      apellidoMaterno: this.paciente.apellidoMaterno!,
      telefono: this.paciente.telefono!,
      fechaNacimiento: new Date(this.paciente.fechaDisplay!),
      sexo: this.paciente.sexo!,
      estadoCivil: this.paciente.estadoCivil!,
      ocupacion: this.paciente.ocupacion!,
      // Añadir otros campos si es necesario
    };
    console.log(this.idPaciente);
    console.log(updatePacienteDto);
    this.pacienteService.modificarPaciente(this.idPaciente, updatePacienteDto).subscribe({
      next: (response) => {
        this.matSnackBar.open('Paciente modificado exitosamente', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.editMode = false; // Salir del modo de edición
      },
      error: (error) => {
        this.matSnackBar.open('Error al modificar el paciente: ' + error.message, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
}

  eliminarPaciente(): void {
    // Implementa la lógica para eliminar la información del paciente
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.idPaciente = id ? +id : null; // Convertir el id a número
      if (this.idPaciente) {
        this.pacienteService.deletePaciente(this.idPaciente).subscribe({
          next: (response) => {

            this.matSnackBar.open("Paciente Eliminado", 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });
          },
          error: (error) => {
              this.matSnackBar.open(error.error.message, 'Close', {
                  duration: 5000,
                  horizontalPosition: 'center',
              });
          },
      });
        console.log('ID del paciente:', this.idPaciente);
      } else {
        console.error('ID de paciente no definido');
      }
    });
    // Luego, puedes redirigir a la lista de pacientes después de eliminar
    this.router.navigate(['/paciente']);

  }

  agregarCita(): void {
    // Implementa la lógica para agregar una nueva cita
    console.log('Agregar nueva cita');
    // Podrías redirigir a un formulario para agregar la cita
  }

  volverALaLista(): void {
    this.router.navigate(['/paciente']);
  }


// Método para formatear la fecha
formatFecha(fechaString: string): string {
  const fecha = this.parseFecha(fechaString);

  if (!fecha || isNaN(fecha.getTime())) {
    // Retorna un string vacío o un mensaje de error si la fecha no es válida
    return 'Fecha inválida';
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // "lunes"
    day: 'numeric',  // "8"
    month: 'long',   // "agosto"
    year: 'numeric'  // "2024"
  };

  return new Intl.DateTimeFormat('es-ES', options).format(fecha);
}

// Método auxiliar para analizar la fecha
parseFecha(fechaString: string): Date {
  // Asegúrate de que la fecha esté en un formato que `Date` pueda entender
  const fecha = new Date(fechaString);
  return fecha;
}
}
