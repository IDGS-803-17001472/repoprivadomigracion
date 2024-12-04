import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DiariosPaciente } from 'src/app/interfaces/entrada';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { FechaHoraPipe } from 'src/app/pipes/fecha-hora.pipe';

@Component({
  selector: 'app-detalle-diario',
  templateUrl: './detalle-diario.component.html',
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, FechaHoraPipe],
  styleUrl: './detalle-diario.component.scss'
})
export class DetalleDiarioComponent {
  diario: any;
  idDiario: number | null = null;
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  diarios: DiariosPaciente = {
    id: 0,
    contenido: '',
    fecha: '',
    paciente: {
      id: 0,
      persona: {
        nombre: '',
        apellidoMaterno: '',
        apelllidoPaterno: ''
      }
    },
    mediciones: []
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listadiario();
  }


  listadiario() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); 
      this.idDiario = id ? +id : null; // Convertir el id a número 
      if (this.idDiario) {
        this.authService
        .getDiario(this.idDiario).subscribe({
          next: (response) => {
            console.log('Lista de diarios:', response);
            this.diario = response; 
            // Aplicar filtro después de cargar los datos 
          }, error: (error) => {
            this.matSnackBar.open("No se encontraron entradas del diario", 'Close',
              { duration: 5000, horizontalPosition: 'center', });
          },
        });
        console.log('ID del paciente:', this.idDiario);
      } else {
        console.error('ID de paciente no definido');
      }
    });
  }
}

