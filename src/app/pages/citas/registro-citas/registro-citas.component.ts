import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PacienteService } from '../../../services/paciente.service'; // Asegúrate de tener un servicio que gestione pacientes
import { PacienteView } from '../../../interfaces/pacienteView'; // Modelo de datos para el paciente
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from '../../../interfaces/validation-error';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registro-citas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatLabel, MatSelectModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './registro-citas.component.html',
  styleUrls: ['./registro-citas.component.scss']
})
export class RegistroCitasComponent implements OnInit {
  fecha: string | null = null;
  errors!: ValidationError[];
  appointmentForm: FormGroup;
  pacientes: PacienteView[] = []; // Lista de pacientes

  authService = inject(PacienteService);
  matSnackbar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private pacienteService: PacienteService // Inyecta el servicio de pacientes
  ) {
    this.appointmentForm = this.fb.group({
      idPaciente: ['', Validators.required], // Campo para seleccionar paciente
      horario: ['', Validators.required],
      fecha: ['', Validators.required] // Asegúrate de que el campo fecha esté incluido y tenga un valor
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.fecha = params.get('date'); // Obtén la fecha seleccionada de la URL
      if (this.fecha) {
        this.appointmentForm.patchValue({ fecha: this.fecha }); // Establece la fecha seleccionada en el formulario
      }
    });

    // Obtén la lista de pacientes
    this.pacienteService.getPacientes().subscribe((data: PacienteView[]) => {
      this.pacientes = data;
    });
  }

  registerAppointment() {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
      console.log(`Cita registrada para el paciente con ID ${formData.idPaciente} el ${formData.fecha} a las ${formData.horario}`);

      // Lógica para enviar los datos a la API
      this.authService.registerAppoiment(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/citaPrincipal']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 400) {
            this.matSnackbar.open('Validation error', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });
          }
        },
        complete: () => console.log('Register success'),
      });
    } else {
      this.matSnackbar.open('Complete todos los campos requeridos.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
      });
    }
  }

  goBack() {
    this.router.navigate(['/citas']); // Navega a la vista principal
  }
}
