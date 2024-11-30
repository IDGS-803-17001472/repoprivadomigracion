import { Paciente } from './../../interfaces/paciente';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatDialog } from '@angular/material/dialog';
import { VincularPorCodigoDialogComponent } from './vincular-por-codigo-dialog.component';



@Component({
    selector: 'app-paciente',
    imports: [
        MatTableModule,
        CommonModule,
        MatCardModule,
        TablerIconsModule,
        MaterialModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
    ],
    templateUrl: './paciente.component.html',
    styleUrl: './paciente.component.scss',
    encapsulation: ViewEncapsulation.None
})

export class PacienteComponent {
  
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  routerr = inject(Router);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  pacientes: Paciente[]= [];
  paginatedPacientes: Paciente[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = Math.ceil(this.pacientes.length / this.pageSize);

  pacienteSeleccionado?: Paciente;


  nuevoPaciente() {

    this.router.navigate(['paciente/agregar']);
  }





  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];



  constructor(private router: Router, 
    private dialog: MatDialog // Inyección de MatDialog
    ) {}

  ngOnInit() {
    this.listaPacientePsicologo();
    this.applyFilter(); // Inicializa la lista de pacientes con paginación y filtro
    console.log(this.paginatedPacientes);
  }


  // Método para abrir el diálogo
  vincularPorCodigo() {
    const dialogRef = this.dialog.open(VincularPorCodigoDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((codigo) => {
      if (codigo) {
        console.log('Código recibido:', codigo);
        // Aquí puedes manejar el código, como enviarlo a tu API
      }
    });
  }



  seleccionarPaciente(paciente: Paciente) {
    if (paciente && paciente.idPaciente) {
      console.log(paciente)
      this.router.navigate(['paciente/detalle', paciente.idPaciente]);
    } else {
      console.error('Paciente o ID de paciente no definido:', paciente);
      // Manejar el error de forma adecuada
    }
  }


  getAge(dateString : string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


  listaPacientePsicologo() {
    this.authService.getPacientePsicologo().subscribe({
        next: (response) => {
            console.log('Lista de pacientes:', response);
            this.pacientes = response; // Assuming `pacientes` is where you store the list
            this.pacientes.forEach(element => {
              element.edad = this.calcularEdad(element.fechaNacimiento);
            });
            console.log(this.pacientes)
            this.applyFilter(); // Refresh the list if necessary
        },
        error: (error) => {
            this.matSnackBar.open(error.error.message, 'Close', {
                duration: 5000,
                horizontalPosition: 'center',
            });
        },
    });
}

applyFilter() {
  const filterValue = this.searchTerm.toLowerCase();
  const filteredPacientes = this.pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(filterValue) ||
    paciente.edad!.toString().includes(filterValue) ||
    paciente.email.toLowerCase().includes(filterValue)
  );

  this.totalPages = Math.ceil(filteredPacientes.length / this.pageSize);
  this.setPage(this.currentPage, filteredPacientes);
}

setPage(page: number, filteredPacientes: Paciente[] = this.pacientes) {
  this.currentPage = page;
  const startIndex = (this.currentPage - 1) * this.pageSize;
  this.paginatedPacientes = filteredPacientes.slice(startIndex, startIndex + this.pageSize);
  
  console.log(this.paginatedPacientes);
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



}
