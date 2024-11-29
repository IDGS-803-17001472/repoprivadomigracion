import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioDetalleComponent } from './diario-detalle.component';

describe('DiarioDetalleComponent', () => {
  let component: DiarioDetalleComponent;
  let fixture: ComponentFixture<DiarioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiarioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
