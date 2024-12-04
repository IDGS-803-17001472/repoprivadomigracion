import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Queja } from 'src/app/interfaces/queja';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, ReactiveFormsModule, CommonModule, MatSelectModule,
    MatTableModule
  ],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
  contactForm: FormGroup;
  quejas: Queja[] = [];
  matSnackbar = inject(MatSnackBar);
  router = inject(Router);
  displayedColumns: string[] = ['id', 'tipo', 'descripcion', 'estatus'];


  constructor(private fb: FormBuilder, private quejaService: AuthService) {
    this.contactForm = this.fb.group({
      tipo: ['', Validators.required], // Campo tipo
      mensaje: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.cargarQuejas();
  }
  cargarQuejas(): void {
    this.quejaService.obtenerQuejas().subscribe({
      next: (data) => {
        console.log('Quejas obtenidas:', data);
        this.quejas = data;
      },
      error: (err) => {
        console.error('Error al cargar las quejas:', err);
      }
    });
  }

  // Opciones del selector
  tipos = [
    { value: 1, label: 'Mejora' },
    { value: 2, label: 'Queja' },
    { value: 3, label: 'Error' },
    { value: 4, label: 'Sugerencia' }
  ];
  submitContactForm() {
    if (this.contactForm.valid) {
      const queja: Queja = {
        estatus: 1, // Ejemplo de estatus inicial
        tipo: this.contactForm.value.tipo, // Obtener tipo del formulario
        descripcion: this.contactForm.value.mensaje
      };

      this.quejaService.registrarQueja(queja).subscribe({
        next: (response) => {
          console.log('Queja registrada:', response);
          this.matSnackbar.open('Queja registrada con éxito.', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.ngOnInit();
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Error al registrar la queja:', err);
          alert('Error al registrar la queja.');
        }
      });
    }
  }
}