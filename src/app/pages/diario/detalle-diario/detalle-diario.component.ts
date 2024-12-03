import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-detalle-diario',
  templateUrl: './detalle-diario.component.html',
  imports: [ RouterLink, CommonModule,
  ],
  styleUrl: './detalle-diario.component.css'
})
export class DetalleDiarioComponent {
  diario: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // Aquí debes recuperar el diario usando el id
    // Simulación de datos para ejemplo
    this.diario = {
      titulo: 'Diario Ejemplo',
      fecha: new Date(),
      descripcion: 'Descripción del diario.',
      emocion: 'Feliz'
    };
  }
}

