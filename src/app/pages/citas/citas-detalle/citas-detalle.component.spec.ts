import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDetalleComponent } from './citas-detalle.component';

describe('CitasDetalleComponent', () => {
  let component: CitasDetalleComponent;
  let fixture: ComponentFixture<CitasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitasDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
