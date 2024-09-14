import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vet-insurance-form',
  templateUrl: './vet-insurance-form.component.html',
  styleUrls: ['./vet-insurance-form.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VetInsuranceFormComponent {
  vetForm: FormGroup;

  // this.vetForm = new FormGroup({
  //   petNameControl: new FormControl('Todd', Validators.required)
  // });
    
    // Pet Information
    
    // speciesControl = new FormControl('', Validators.required);
    // breedControl = new FormControl('', Validators.required);
    // ageControl = new FormControl('', Validators.required);
    // petGenderControl = new FormControl('', Validators.required);
    // petWeightControl = new FormControl('', Validators.required);
    // species: ['', Validators.required],
    // breed: ['Terrier', Validators.required],
    // age: ['5', [Validators.required, Validators.min(0)]],
    // gender: ['Male', Validators.required],
    // weight: ['11', [Validators.required, Validators.min(0)]],
    
    // // Policy Information
    // policyNumber: ['I4023486', Validators.required],
    // insuranceProvider: ['Pet Number One', Validators.required],
    // coveragePlan: ['basic silver', Validators.required],
    // deductible: ['300', [Validators.required, Validators.min(0)]],
    // coPay: ['80', [Validators.required, Validators.min(0)]],
    // annualMaxLimit: ['5000', [Validators.required, Validators.min(0)]]
    constructor(private fb: FormBuilder) {
      this.vetForm = this.fb.group({
        petNameControl: new FormControl('Todd', Validators.required),
        speciesControl : new FormControl('', Validators.required),
        breedControl : new FormControl('', Validators.required),
        ageControl : new FormControl('', Validators.required),
        petGenderControl : new FormControl('', Validators.required),
        petWeightControl : new FormControl('', Validators.required)
      })
    
    }
  

  Submit() {
    console.log('works');  
  }
}
