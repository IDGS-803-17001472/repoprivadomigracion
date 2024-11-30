import { Paciente } from './../../../interfaces/paciente';

import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleService } from './../../../services/role-service.service';
import { Role } from '../../../interfaces/role';
import { ValidationError } from '../../../interfaces/validation-error';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PacienteService } from '../../../services/paciente.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agregar-paciente',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatIconModule,  CommonModule, ReactiveFormsModule, MatCardModule,
    MatDatepickerModule, MatButtonModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './agregar-paciente.component.html',
  styleUrl: './agregar-paciente.component.scss'
})
export class AgregarPacienteComponent {
  showCodeInput = false;
  showForm = false;
  roleService = inject(RoleService);
  authService = inject(PacienteService);
  matSnackbar = inject(MatSnackBar);
  roles$!: Observable<Role[]>;
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  linkForm!: FormGroup;
  hide = true;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;
  errors!: ValidationError[];


  register() {
    if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Validations error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => console.log('Register success'),
    });
  }else{
    console.log('Formulario no válido');
  }
  }
  check() {
    if(this.authService.getUserDetail()){
      console.log("hola");
    }else{
      console.log("adios")
    }
  }

  linkPaciente() {
    if (this.linkForm.valid) {
    this.authService.linkPaciente(this.linkForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/paciente']);
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Validations error', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => console.log('Union success'),
    });
  }else{
    console.log('Formulario no válido');
  }
  }

  ngOnInit(): void {
    this.check();
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellidoMaterno: [''],
        apellidoPaterno: ['', Validators.required],
        sexo: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        ocupacion: ['', Validators.required],
        direccion: ['', Validators.required],
        notasAdicionales: [''],
        roles: [['paciente']],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
      this.linkForm = this.fb.group(
        {
          pacienteId: ['', [Validators.required,]],
        },
    );

    // Subscribe to value changes if needed
    this.registerForm.valueChanges.subscribe(value => {
      console.log('Form value changed:', value);
    });

    this.roles$ = this.roleService.getRoles();
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

}
