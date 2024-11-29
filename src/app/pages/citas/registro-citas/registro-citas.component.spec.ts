import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCitasComponent } from './registro-citas.component';

describe('RegistroCitasComponent', () => {
  let component: RegistroCitasComponent;
  let fixture: ComponentFixture<RegistroCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
