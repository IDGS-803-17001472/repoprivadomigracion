import { ChangeDetectorRef, Component,inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from 'src/app/interfaces/validation-error';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatIconModule, MatSelectModule, MatInputModule, RouterLink, CommonModule],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router, private cd: ChangeDetectorRef) {}
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  authService = inject(AuthService);
  matSnackbar = inject(MatSnackBar);
  errors!: ValidationError[];
  currentSection = 1;
  base64Image: string | null = null; // Variable global dentro del componente

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellidoMaterno: ['',],
        apellidoPaterno: ['', Validators.required],
        sexo: ['', Validators.required],
        foto: [null, Validators.required],
        fechaNacimiento: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        titulo: ['', Validators.required],
        ocupacion: ['', Validators.required],
        roles: [['profesional']],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        address: ['', []]
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  nextSection() {
    this.currentSection = this.currentSection+1;
  }

  previousSection() {
    this.currentSection = this.currentSection-1;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else {
      if (confirmPassword)
      confirmPassword.setErrors(null); // Limpia los errores si coinciden
    }

    return null; // Este retorno es necesario para que Angular no considere este validador como fallido a nivel de formulario
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
  
    
  get f() {
    return this.registerForm.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }

  register() {
    console.log("registrando")
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);

        this.matSnackbar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/authentication/login']);
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
  updateForm(): void {
    if (this.base64Image) {
      this.registerForm.get('foto')?.setValue(this.base64Image); // Asigna el valor al formulario
      console.log('Formulario actualizado:', this.registerForm.value);

      // Forzar la detección de cambios
      this.cd.detectChanges();
    }
  }

}
