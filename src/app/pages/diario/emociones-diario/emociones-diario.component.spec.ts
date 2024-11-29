import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmocionesDiarioComponent } from './emociones-diario.component';

describe('EmocionesDiarioComponent', () => {
  let component: EmocionesDiarioComponent;
  let fixture: ComponentFixture<EmocionesDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmocionesDiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmocionesDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
