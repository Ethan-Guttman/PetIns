import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vet-insurance-form',
  templateUrl: './vet-insurance-form.component.html',
  styleUrls: ['./vet-insurance-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class VetInsuranceFormComponent {
  vetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vetForm = this.fb.group({
      // Pet Information
      petName: ['', Validators.required],
      species: ['', Validators.required],
      breed: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]],
      
      // Policy Information
      policyNumber: ['', Validators.required],
      insuranceProvider: ['', Validators.required],
      coveragePlan: ['', Validators.required],
      deductible: ['', [Validators.required, Validators.min(0)]],
      coPay: ['', [Validators.required, Validators.min(0)]],
      annualMaxLimit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (!this.vetForm.valid) {
      alert('Invalid form');
    } 
    console.log('here');
  }
}
