import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PacienteService } from './../../services/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationError } from 'src/app/interfaces/validation-error';

@Component({
  selector: 'app-vincular-por-codigo-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  template: `
    <h1 mat-dialog-title>Vincular por Código</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" >
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput type="number" formControlName="pacienteId" required />
          <mat-error *ngIf="form.get('pacienteId')?.hasError('required')">El código es obligatorio</mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions align="end">
    <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="send()">Enviar</button>
      <button mat-stroked-button color="warn" mat-dialog-close>Cancelar</button>
    </div>
  `,
})
export class VincularPorCodigoDialogComponent {
    private matSnackbar = inject(MatSnackBar) ;
    errors!: ValidationError[];
authService = inject(PacienteService);
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VincularPorCodigoDialogComponent>,
    private fb: FormBuilder,
    private router : Router
  ) {
    this.form = this.fb.group(
        {
          pacienteId: ['', [Validators.required,]],
        },);


    
  }





  send() {
    if (this.form.valid) {
    this.authService.linkPaciente(this.form.value).subscribe({
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




  enviar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.codigo); // Retorna el código al componente que abre el diálogo
    }
  }
}
