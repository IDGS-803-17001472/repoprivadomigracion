import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetail } from 'src/app/interfaces/user-detail';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  imports: [MatListModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);

  userDetail: UserDetail | null = null; // Variable para guardar el detalle del usuario
  imgSrc: string | null = null; // Variable específica para la foto
  serverUrl = environment.serverUrl;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.authService.getDetailCuenta().subscribe({
      next: (response) => {
        console.log('Lista de data:', response);

        // Guardar todos los datos del usuario
        this.userDetail = response;

        // Generar el enlace de la foto en base64
        if (response.foto) {
          this.imgSrc = `${this.serverUrl}${response.foto}`;
        }
      },
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }
}
