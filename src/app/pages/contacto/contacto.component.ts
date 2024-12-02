import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Aquí puedes manejar el envío de datos
    }
  }
}
