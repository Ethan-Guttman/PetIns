import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, ChangeDetectionStrategy, signal, computed, model, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import axios from 'axios';


@Component({
  selector: 'app-vet-insurance-form',
  templateUrl: './vet-insurance-form.component.html',
  styleUrls: ['./vet-insurance-form.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatAutocompleteModule, MatChipsModule, ReactiveFormsModule, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class VetInsuranceFormComponent {
  vetForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  currentCare = model('');
  readonly cares = signal(['Checkup']);
  readonly allCare: string[] = ['Checkup', 'Vaccination', 'Blood Test', 'Oral Health Exam', 'Orthopedic surgery'];
  readonly filteredCare = computed(() => {
    const currentCare = this.currentCare().toLowerCase();
    return currentCare
      ? this.allCare.filter(care => care.toLowerCase().includes(currentCare))
      : this.allCare.slice();
  });
  readonly announcer = inject(LiveAnnouncer);

  chatGptMessage: string = "";

    constructor(private fb: FormBuilder) {
      this.vetForm = this.fb.group({
        custFirstNameControl: new FormControl('', Validators.required),
        custLastNameControl: new FormControl('', Validators.required),
        custDobControl: new FormControl('', Validators.required),
        custProviderControl: new FormControl('', Validators.required),
        custPolicyNumControl: new FormControl('', Validators.required),
        petNameControl: new FormControl('', Validators.required),
        speciesControl : new FormControl('', Validators.required),
        ageControl : new FormControl('', [Validators.required, Validators.min(0)]),
        petGenderControl : new FormControl('', Validators.required),
        petWeightControl : new FormControl('', [Validators.required, Validators.min(0)]),
        careControl : new FormControl('')
      })
    
    }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (!this.allCare.includes(value)) {
      return;
    }

    if (value) {
      this.cares.update(cares => [...cares, value]);
    }

    this.currentCare.set('');
    console.log('here');
    event.chipInput!.clear();
  }

  remove(care: string): void {
    this.cares.update(cares => {
      const index = cares.indexOf(care);
      if (index < 0) {
        return cares;
      }

      cares.splice(index, 1);
      this.announcer.announce(`Removed ${care}`);
      return [...cares];
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.cares.update(cares => [...cares, event.option.viewValue]);
    this.currentCare.set('');
    event.option.deselect();

  }

  async Submit() {
    // console.log(this.cares()); 
    
    let customerId = '';
    let receivedMessage = "";

    await axios.post('http://127.0.0.1:5000/api/customers', {
      'first_name': this.vetForm.get('custFirstNameControl')?.value,
      'last_name': this.vetForm.get('custLastNameControl')?.value,
      'date_of_birth': this.vetForm.get('custDobControl')?.value,
      'insurance_provider': this.vetForm.get('custProviderControl')?.value,
      'policy_number': this.vetForm.get('custPolicyNumControl')?.value
    }).then(function (response) {
      console.log('Success:', response.data);
      customerId = response.data.id;
      // document.getElementById('result').innerText = `Sum: ${response.data.sum}`;
    })
    .catch(function (error) {
      console.error('Error:', error.response.data);
      // document.getElementById('result').innerText = `Error: ${error.response.data.error}`;
    });


    await axios.post('http://127.0.0.1:5000/api/pets', {
      'name': this.vetForm.get('petNameControl')?.value,
      'owner': customerId,
      'age': this.vetForm.get('ageControl')?.value,
      'weight': this.vetForm.get('petWeightControl')?.value
    }).then(function (response) {
      console.log('Success:', response.data);
      // document.getElementById('result').innerText = `Sum: ${response.data.sum}`;
    })
    .catch(function (error) {
      console.error('Error:', error.response.data);
      // document.getElementById('result').innerText = `Error: ${error.response.data.error}`;
    });

    await axios.post('http://127.0.0.1:5000/api/calculatecost', {
      'provider': this.vetForm.get('custProviderControl')?.value,
      'age': this.vetForm.get('ageControl')?.value,
      'treatment':this.cares()
    }).then(function (response) {
      console.log('Success:', response.data);
      // document.getElementById('result').innerText = `Sum: ${response.data.sum}`;
      receivedMessage = response.data['chatgpt_confirmation'];
    })
    .catch(function (error) {
      console.error('Error:', error.response.data);
      // document.getElementById('result').innerText = `Error: ${error.response.data.error}`;
    });

    this.chatGptMessage = receivedMessage;
    console.log(this.chatGptMessage.length);
  }
}
