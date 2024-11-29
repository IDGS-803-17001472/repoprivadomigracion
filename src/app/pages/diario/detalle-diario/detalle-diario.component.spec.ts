import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDiarioComponent } from './detalle-diario.component';

describe('DetalleDiarioComponent', () => {
  let component: DetalleDiarioComponent;
  let fixture: ComponentFixture<DetalleDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
