import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DiariosPaciente } from '../../../interfaces/entrada';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diario-detalle',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './diario-detalle.component.html',
  styleUrl: './diario-detalle.component.scss'
})
export class DiarioDetalleComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);
  idSelecct : number | undefined;
  diario!: DiariosPaciente;  // Changed to a single Entrada instead of an array
  ngOnInit(): void {
    this.obtenerDetalleDiario();
  }

  obtenerDetalleDiario() {
    // Obtén el ID del parámetro de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.idSelecct = +params.get('id')!;
      this.authService.getDiario(id).subscribe({
        next: (response) => {
          console.log('Detalle del diario:', response);
          this.diario = response;
        },
        error: (error) => {
          this.matSnackBar.open(error.error.message, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        },
      });
    });
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
  goBack() {
    this.router.navigate(['/paciente']);
  }
}
