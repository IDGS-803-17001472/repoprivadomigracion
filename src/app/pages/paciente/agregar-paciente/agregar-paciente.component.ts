import { Paciente } from './../../../interfaces/paciente';

import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-agregar-paciente',
    imports: [MatInputModule, MatSelectModule, MatIconModule, CommonModule, ReactiveFormsModule, MatCardModule,
        MatDatepickerModule, MatButtonModule,MatNativeDateModule
    ],
    providers: [

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
  base64Image: string | null = null; // Variable global dentro del componente

  constructor( private cd: ChangeDetectorRef) {}

  register() {
    if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (err: HttpErrorResponse) => {
        if (err!.status === 400) {
          this.errors = err!.error;
          this.matSnackbar.open('Errores de Validacion', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      },
      complete: () => {console.log('Register success');

      },
    });
  }else{
    console.log('Formulario no válido');
    this.logFormErrors();
  }
  }


  volverALaLista(): void {
    this.router.navigate(['/paciente']);
  }


  logFormErrors() {
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      if (control && control.invalid) {
        console.log(`Error en el campo "${field}":`, control.errors);
      }
    });
  }

  check() {
    if(this.authService.getUserDetail()){
      console.log("hola");
    }else{
      console.log("adios")
    }
  }

  selectedFileName: string | null = null;



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
        foto: [null],
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten imágenes (PNG, JPEG, JPG)');
        input.value = ''; // Reinicia el input
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('El tamaño máximo permitido es 2MB');
        input.value = ''; // Reinicia el input
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result.toString(); // Guarda el resultado en la variable
          this.updateForm(); // Actualiza el formulario
        }
      };

      reader.onerror = () => {
        alert('Ocurrió un error al leer el archivo');
        input.value = ''; // Reinicia el input en caso de error
      };

      reader.readAsDataURL(file); // Convierte a Base64
    }
  }


  updateForm(): void {
    if (this.base64Image) {
      this.registerForm.get('foto')?.setValue(this.base64Image); // Asigna el valor al formulario
      console.log('Formulario actualizado:', this.registerForm.value);

      // Forzar la detección de cambios
      this.cd.detectChanges();
    }
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

}
