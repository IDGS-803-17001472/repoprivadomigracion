import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
    selector: 'app-header',
    imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule],
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
   imgSrc: string;

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();


  
  ngOnInit() {
    this.getData();
  }

  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Logout success', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/authentication/login']);
  };

  getData() {
    this.authService.getDetail().subscribe({
        next: (response) => {
            console.log('Lista de data:', response);
            this.imgSrc = response.foto;
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

