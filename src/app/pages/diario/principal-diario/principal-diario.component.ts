import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiariosPaciente } from '../../../interfaces/entrada';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-principal-diario',
  imports: [FormsModule, CommonModule, MatCardModule, MatDatepickerModule, ReactiveFormsModule,
     MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule],
  templateUrl: './principal-diario.component.html',
  styleUrls: ['./principal-diario.component.scss']
})
export class PrincipalDiarioComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);



  selectedMonth: string | null = null; // Para almacenar el mes seleccionado (formato 'yyyy-MM')
  selectedMonth2: string | null = null; // Para almacenar el mes seleccionado (formato 'yyyy-MM')
  diarios: DiariosPaciente[] = [];
  filteredDiarios: DiariosPaciente[] = [];
  idPaciente: number | null = null;

  selectedDate: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listadiario();
    this.setCurrentMonth(); // Inicializar con el mes actual
}

setCurrentMonth(): void {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  this.selectedMonth2 = `${year}-${month}`; // Garantizar formato 'yyyy-MM'
}


  monthSelected(date: Date, datepicker: any): void {
    // Establecer selectedMonth en formato 'yyyy-MM'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    this.selectedMonth2 = `${year}-${month}`;
    
    datepicker.close(); // Cierra el datepicker
    this.filterByMonth(); // Aplica el filtro
  }
  filterByMonth(): void {
    console.log('Mes seleccionado:', this.selectedMonth);
  
    if (this.selectedMonth2) {
      const [year, month] = this.selectedMonth2.split('-').map(Number); // Extraer año y mes
      this.filteredDiarios = this.diarios.filter(diario => {
        const diarioFecha = new Date(diario.fecha); // Asegúrate de que diario.fecha sea compatible
        return (
          diarioFecha.getFullYear() === year &&
          diarioFecha.getMonth() === month - 1 // getMonth() es 0-indexado
        );
      });
    } else {
      this.filteredDiarios = [...this.diarios]; // Si no hay selección, mostrar todos los diarios
    }
  
    console.log('Diarios filtrados:', this.filteredDiarios);
  }
  
  parseFechaToMonthFormat(fechaString: string): string {
    const fecha = new Date(fechaString); // Convierte a Date
    if (!fecha || isNaN(fecha.getTime())) {
      console.error('Fecha inválida:', fechaString);
      return ''; // Retorna vacío si no es válida
    }
    // Formatear como yyyy-MM
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
    return `${year}-${month}`;
  }


  volverALaLista() {

    this.router.navigate(['/paciente/detalle', this.idPaciente]);
  }


  verDetalleDiario(id: number): void {
    this.router.navigate(['/detalle-diario', id]);
  }

  listadiario() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); this.idPaciente = id ? +id : null; // Convertir el id a número 
      if (this.idPaciente) {
        this.authService
        .getListaDiarios(this.idPaciente).subscribe({
          next: (response) => {
            console.log('Lista de diarios:', response);
            this.diarios = response; this.setCurrentMonth();
            // Establecer el mes actual 
            this.filterByMonth();
            // Aplicar filtro después de cargar los datos 
          }, error: (error) => {
            this.matSnackBar.open("No se encontraron entradas del diario", 'Close',
              { duration: 5000, horizontalPosition: 'center', });
          },
        });
        console.log('ID del paciente:', this.idPaciente);
      } else {
        console.error('ID de paciente no definido');
      }
    });
  }



  // Método para formatear la fecha
  formatFecha(fechaString: string): string {
    const fecha = this.parseFecha(fechaString);
    if (!fecha || isNaN(fecha.getTime())) {
      return 'Fecha inválida';
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('es-ES', options).format(fecha);
  }


  // Método auxiliar para analizar la fecha  
  parseFecha(fechaString: string): Date {
    return new Date(fechaString);
  }

}
