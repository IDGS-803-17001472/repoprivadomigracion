import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaPrincipalComponent } from './cita-principal.component';

describe('CitaPrincipalComponent', () => {
  let component: CitaPrincipalComponent;
  let fixture: ComponentFixture<CitaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
