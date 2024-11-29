import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service'; // Servicio para manejar citas
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-citas-detalle',
  standalone: true,
  templateUrl: './citas-detalle.component.html',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatListModule, MatButtonModule],
  styleUrls: ['./citas-detalle.component.scss']
})
export class CitasDetalleComponent implements OnInit {
  citaId: string | null = null;
  citaEstado: string = ''; // Estado de la cita
  reprogramarForm: FormGroup;
  showReprogramar: boolean = false;
  citaDetails: any = {}; // Detalles de la cita

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private citaService: PacienteService
  ) {
    this.reprogramarForm = this.fb.group({
      nuevaFecha: [''],
      nuevaHora: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.citaId = params.get('id');
      this.loadCitaDetails(); // Carga los detalles de la cita
    });
  }

  loadCitaDetails() {
    if (this.citaId) {
      this.citaService.getCitaById(this.citaId).subscribe((cita: any) => {
        console.log(cita);
        this.citaDetails = cita;
        this.citaEstado = cita.estatus;
      });
    }
  }

  goBack() {
    this.router.navigate(['/citas']);
  }

  toggleReprogramar() {
    this.showReprogramar = !this.showReprogramar;
  }

  reprogramar() {
    const nuevaFecha = this.reprogramarForm.value.nuevaFecha;
    const nuevaHora = this.reprogramarForm.value.nuevaHora;

    if (this.citaId) {
      this.citaService.reprogramarCita(this.citaId, nuevaFecha, nuevaHora).subscribe(() => {
        console.log(`Cita ${this.citaId} reprogramada a ${nuevaFecha} ${nuevaHora}`);
        this.goBack(); // Navegar de regreso al calendario después de reprogramar
      });
    }
  }

  aceptarCita() {
    if (this.citaId) {
      this.citaService.aceptarCita(this.citaId).subscribe(
        () => {
          console.log('Cita aceptada exitosamente');
          window.location.reload(); // Recarga la página
          this.loadCitaDetails(); // Actualiza los detalles de la cita después de aceptarla
        },
        (error) => {
          window.location.reload(); // Recarga la página
          console.error('Error al aceptar la cita', error);
        }
      );
    }
  }

}
