import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VetInsuranceFormComponent } from './vet-insurance-form/vet-insurance-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VetInsuranceFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PetInsSetup';
}
