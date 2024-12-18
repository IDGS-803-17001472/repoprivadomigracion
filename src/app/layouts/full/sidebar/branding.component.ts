import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-branding',
    imports: [RouterModule],
    template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/logos/logo3.png"
          class="align-middle m-2"
          alt="logo"
          width="100%"
        />
      </a>
    </div>
  `
})
export class BrandingComponent {
  constructor() {}
}
