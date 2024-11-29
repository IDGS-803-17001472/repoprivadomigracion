import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDiarioComponent } from './principal-diario.component';

describe('PrincipalDiarioComponent', () => {
  let component: PrincipalDiarioComponent;
  let fixture: ComponentFixture<PrincipalDiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalDiarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
