import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetInsuranceFormComponent } from './vet-insurance-form.component';

describe('VetInsuranceFormComponent', () => {
  let component: VetInsuranceFormComponent;
  let fixture: ComponentFixture<VetInsuranceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetInsuranceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetInsuranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
