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
import { MatButtonModule } from '@angular/material/button';


// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.scss',
  encapsulation: ViewEncapsulation.None,
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






  displayedColumns1: string[] = ['assigned', 'name', 'priority', 'budget'];
  dataSource1 = PRODUCT_DATA;



  constructor(private router: Router) {}

  ngOnInit() {
    this.listaPacientePsicologo();
    this.applyFilter(); // Inicializa la lista de pacientes con paginación y filtro
    console.log(this.paginatedPacientes);
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
