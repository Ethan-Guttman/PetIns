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

    constructor(private fb: FormBuilder) {
      this.vetForm = this.fb.group({
        petNameControl: new FormControl('Todd', Validators.required),
        speciesControl : new FormControl('', Validators.required),
        ageControl : new FormControl('', Validators.required),
        petGenderControl : new FormControl('', Validators.required),
        petWeightControl : new FormControl('', Validators.required),
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

    // Clear the input value
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

  Submit() {
    console.log(this.cares());  
  }
}
